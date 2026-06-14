/**
 * Six Nimmt (6 nimmt!) Game Engine & Agents Implementation
 * Custom developed for the interactive blog post.
 */

// --- Core Utility Functions ---

function getBullHeads(number) {
    if (number === 55) return 7;
    if (number % 11 === 0) return 5;
    if (number % 10 === 0) return 3;
    if (number % 5 === 0) return 2;
    return 1;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function findRowForCard(card, rows) {
    let bestRowIndex = -1;
    let bestValue = -1;
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (row.length === 0) continue;
        const lastCard = row[row.length - 1];
        if (lastCard < card && lastCard > bestValue) {
            bestRowIndex = i;
            bestValue = lastCard;
        }
    }
    return bestRowIndex;
}

function chooseRowToTakeSimple(rows) {
    let minBulls = Infinity;
    let bestRowIndex = 0;
    for (let i = 0; i < rows.length; i++) {
        const bulls = rows[i].reduce((sum, card) => sum + getBullHeads(card), 0);
        if (bulls < minBulls) {
            minBulls = bulls;
            bestRowIndex = i;
        }
    }
    return bestRowIndex;
}

function chooseRowToTakeWeighted(rows) {
    let minScore = Infinity;
    let bestRowIndex = 0;
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const bullHeads = row.reduce((sum, card) => sum + getBullHeads(card), 0);
        const avgValue = row.length > 0 ? row.reduce((sum, card) => sum + card, 0) / row.length : 0;
        // Weighted score: favor taking rows that have high card values
        // because it's harder for players to get stuck below them later
        const score = bullHeads - (avgValue / 200);
        if (score < minScore) {
            minScore = score;
            bestRowIndex = i;
        }
    }
    return bestRowIndex;
}

// --- Agent Logic ---

function playAgentCard(agentType, hand, rows) {
    if (hand.length === 0) return null;
    
    switch (agentType) {
        case 'random':
            return hand[Math.floor(Math.random() * hand.length)];
            
        case 'lowest':
            return Math.min(...hand);
            
        case 'highest':
            return Math.max(...hand);
            
        case 'middle':
            const sorted = [...hand].sort((a, b) => a - b);
            return sorted[Math.floor(sorted.length / 2)];
            
        case 'greedy':
            // Play card with the highest bull heads
            let maxBulls = -1;
            let greedyCard = hand[0];
            for (const card of hand) {
                const bulls = getBullHeads(card);
                if (bulls > maxBulls || (bulls === maxBulls && card < greedyCard)) {
                    maxBulls = bulls;
                    greedyCard = card;
                }
            }
            return greedyCard;
            
        case 'smart':
            // Play the card that's closest to and higher than any row end card
            const rowEnds = rows.map(r => r[r.length - 1]);
            let bestCard = null;
            let minDiff = Infinity;
            
            for (const card of hand) {
                for (const endVal of rowEnds) {
                    if (card > endVal && (card - endVal) < minDiff) {
                        minDiff = card - endVal;
                        bestCard = card;
                    }
                }
            }
            if (bestCard !== null) return bestCard;
            
            // Fallback to lowest card
            return Math.min(...hand);
            
        default:
            return Math.min(...hand);
    }
}

// --- Monte Carlo Search Agent Implementation ---

function searchSimulation(rows, card, hand, depth, opponents) {
    let tally = 0;
    if (depth === 0 || opponents.length === 0 || opponents[0].hand.length === 0) {
        return tally;
    }

    // 1. Simulate other players' moves for this step
    const moves = [{ type: 'search', card: card }];
    for (let i = 0; i < opponents.length; i++) {
        const opp = opponents[i];
        const oppCard = playAgentCard(opp.agentType, opp.hand, rows);
        
        // Remove card from opponent hand
        const idx = opp.hand.indexOf(oppCard);
        if (idx !== -1) opp.hand.splice(idx, 1);
        
        moves.push({ type: 'opponent', card: oppCard });
    }

    // Sort moves by card number ascending
    moves.sort((a, b) => a.card - b.card);

    // Apply moves to rows
    for (const move of moves) {
        const rowIndex = findRowForCard(move.card, rows);
        if (rowIndex === -1) {
            // Must take a row. Search player uses weighted evaluation, opponent uses simple
            const chosenRowIndex = (move.type === 'search') 
                ? chooseRowToTakeWeighted(rows) 
                : chooseRowToTakeSimple(rows);
            
            const penalty = rows[chosenRowIndex].reduce((sum, c) => sum + getBullHeads(c), 0);
            if (move.type === 'search') {
                tally += penalty;
            }
            rows[chosenRowIndex] = [move.card];
        } else {
            // Check if adding 6th card (row length is 5)
            if (rows[rowIndex].length === 5) {
                const penalty = rows[rowIndex].reduce((sum, c) => sum + getBullHeads(c), 0);
                if (move.type === 'search') {
                    tally += penalty;
                }
                rows[rowIndex] = [move.card];
            } else {
                rows[rowIndex].push(move.card);
            }
        }
    }

    // If search player hand is empty, return current tally
    if (hand.length === 0) {
        return tally;
    }

    // Minimax: find the card in player hand that minimizes subsequent penalty
    let minScore = Infinity;
    for (const nextCard of hand) {
        // Clone opponents, hand, and rows for the recursive step
        const nextOpponents = opponents.map(opp => ({
            hand: [...opp.hand],
            agentType: opp.agentType
        }));
        const nextHand = hand.filter(c => c !== nextCard);
        const nextRows = rows.map(r => [...r]);

        const score = searchSimulation(nextRows, nextCard, nextHand, depth - 1, nextOpponents);
        if (score < minScore) {
            minScore = score;
        }
    }

    return tally + (minScore === Infinity ? 0 : minScore);
}

function playSearchCard(hand, rows, allPlayedCards, opponentsCount, lookAheadDepth, nSimulations) {
    if (hand.length === 0) return { bestCard: null, scoresReport: [] };
    
    // Determine cards left in circulation
    const allCards = Array.from({ length: 104 }, (_, i) => i + 1);
    
    const seenCards = new Set();
    rows.forEach(row => row.forEach(card => seenCards.add(card)));
    hand.forEach(card => seenCards.add(card));
    allPlayedCards.forEach(card => seenCards.add(card));
    
    const remainingCards = allCards.filter(card => !seenCards.has(card));
    
    const cardScores = {};
    for (const card of hand) {
        cardScores[card] = 0;
    }
    
    // Perform Monte Carlo simulations
    for (let sim = 0; sim < nSimulations; sim++) {
        const deck = [...remainingCards];
        shuffleArray(deck);
        
        // Deal cards to opponents
        const opponents = [];
        let deckIdx = 0;
        for (let opp = 0; opp < opponentsCount; opp++) {
            const oppHand = deck.slice(deckIdx, deckIdx + hand.length);
            deckIdx += hand.length;
            opponents.push({
                hand: oppHand,
                agentType: 'smart' // In search simulation, assume opponents play smartly
            });
        }
        
        // Evaluate each possible card we could play
        for (const card of hand) {
            const rowsCopy = rows.map(r => [...r]);
            const opponentsCopy = opponents.map(opp => ({
                hand: [...opp.hand],
                agentType: opp.agentType
            }));
            const handCopy = hand.filter(c => c !== card);
            
            const penalty = searchSimulation(rowsCopy, card, handCopy, lookAheadDepth, opponentsCopy);
            cardScores[card] += penalty;
        }
    }
    
    // Compile scores
    let bestCard = hand[0];
    let minScore = Infinity;
    const scoresReport = [];
    
    for (const card of hand) {
        const avgScore = cardScores[card] / nSimulations;
        scoresReport.push({ card, score: avgScore });
        if (avgScore < minScore) {
            minScore = avgScore;
            bestCard = card;
        }
    }
    
    // Sort scoresReport by card number
    scoresReport.sort((a, b) => a.card - b.card);
    
    return { bestCard, scoresReport };
}

// --- Game State & UI Controller Class ---

class SixNimmtGame {
    constructor() {
        this.players = [];
        this.rows = [[], [], [], []];
        this.deck = [];
        this.allPlayedCards = [];
        this.round = 0;
        this.turn = 0;
        
        // Game states: 'setup', 'playing_card', 'revealed', 'resolving_card', 'waiting_row_take', 'round_ended', 'game_ended'
        this.state = 'setup'; 
        this.playedCardsThisTurn = []; // Array of { playerIndex, card }
        this.resolvingIndex = 0; // Index in sorted playedCardsThisTurn
        this.pendingRowTakeIndex = -1; // Index of player who must take a row
        
        // Settings (configurable in UI)
        this.searchDepth = 2;
        this.searchSimulations = 10;
        this.maxRounds = 1;
        
        // Bind UI methods
        this.logMessage = this.logMessage.bind(this);
    }
    
    initGame(playerConfigs) {
        // playerConfigs: Array of { name, type }
        this.players = playerConfigs.map(config => ({
            name: config.name,
            type: config.type, // 'human', 'search', 'smart', 'greedy', 'random'
            hand: [],
            collected: [],
            roundPenalty: 0,
            totalPenalty: 0,
            scoreHistory: []
        }));
        
        this.round = 0;
        this.startRound();
    }
    
    startRound() {
        this.round++;
        this.turn = 0;
        this.allPlayedCards = [];
        this.playedCardsThisTurn = [];
        
        // Clear hands and round scores
        this.players.forEach(p => {
            p.hand = [];
            p.collected = [];
            p.roundPenalty = 0;
        });
        
        // Create and shuffle deck
        this.deck = Array.from({ length: 104 }, (_, i) => i + 1);
        shuffleArray(this.deck);
        
        // Deal 10 cards to each player
        for (let i = 0; i < 10; i++) {
            this.players.forEach(p => {
                p.hand.push(this.deck.pop());
            });
        }
        
        // Sort hands
        this.players.forEach(p => {
            p.hand.sort((a, b) => a - b);
        });
        
        // Setup initial rows
        this.rows = [[], [], [], []];
        for (let r = 0; r < 4; r++) {
            const card = this.deck.pop();
            this.rows[r].push(card);
            this.allPlayedCards.push(card);
        }
        
        this.state = 'playing_card';
        this.logMessage(`Round ${this.round} started! Select a card from your hand to play.`);
        this.updateUI();
    }
    
    playHumanCard(card) {
        if (this.state !== 'playing_card') return;
        
        const humanIndex = this.players.findIndex(p => p.type === 'human');
        if (humanIndex === -1) return;
        
        // Remove card from hand
        const idx = this.players[humanIndex].hand.indexOf(card);
        if (idx === -1) return;
        this.players[humanIndex].hand.splice(idx, 1);
        
        // Add to played cards
        this.playedCardsThisTurn = [{ playerIndex: humanIndex, card: card }];
        this.allPlayedCards.push(card);
        
        // Let AIs select their cards
        this.logMessage(`You played card ${card}. AI opponents are thinking...`);
        this.state = 'ai_thinking';
        this.updateUI();
        
        // Wrap AI thinking in a timeout to allow UI update
        setTimeout(() => {
            this.playAICards();
        }, 600);
    }
    
    playAICards() {
        const opponentsCount = this.players.length - 1;
        let searchAIThoughtReport = null;
        
        this.players.forEach((player, index) => {
            if (player.type === 'human') return;
            
            let card;
            if (player.type === 'search') {
                const searchResult = playSearchCard(
                    player.hand, 
                    this.rows, 
                    this.allPlayedCards, 
                    opponentsCount, 
                    this.searchDepth, 
                    this.searchSimulations
                );
                card = searchResult.bestCard;
                searchAIThoughtReport = {
                    playerName: player.name,
                    hand: [...player.hand],
                    scores: searchResult.scoresReport,
                    chosen: card
                };
                
                const idx = player.hand.indexOf(card);
                if (idx !== -1) player.hand.splice(idx, 1);
            } else {
                card = playAgentCard(player.type, player.hand, this.rows);
                
                const idx = player.hand.indexOf(card);
                if (idx !== -1) player.hand.splice(idx, 1);
            }
            
            this.playedCardsThisTurn.push({ playerIndex: index, card: card });
            this.allPlayedCards.push(card);
        });
        
        this.playedCardsThisTurn.sort((a, b) => a.card - b.card);
        this.resolvingIndex = 0;
        this.state = 'revealed';
        
        this.logMessage("All cards revealed! Click 'Place Next Card' to place them one by one.");
        this.updateUI(searchAIThoughtReport);
    }
    
    resolveNextCard() {
        if (this.state !== 'revealed' && this.state !== 'resolving_card') return;
        
        if (this.resolvingIndex >= this.playedCardsThisTurn.length) {
            this.endTurn();
            return;
        }
        
        this.state = 'resolving_card';
        const currentPlay = this.playedCardsThisTurn[this.resolvingIndex];
        const player = this.players[currentPlay.playerIndex];
        const card = currentPlay.card;
        
        const rowIndex = findRowForCard(card, this.rows);
        
        if (rowIndex === -1) {
            this.pendingRowTakeIndex = currentPlay.playerIndex;
            this.state = 'waiting_row_take';
            
            if (player.type === 'human') {
                this.logMessage(`Your card ${card} is smaller than all row ends. Click on a row to take it!`);
                this.updateUI();
            } else {
                const chosenRowIndex = (player.type === 'search') 
                    ? chooseRowToTakeWeighted(this.rows)
                    : chooseRowToTakeSimple(this.rows);
                
                this.takeRow(chosenRowIndex, currentPlay.playerIndex, card);
            }
        } else {
            if (this.rows[rowIndex].length === 5) {
                const penalty = this.rows[rowIndex].reduce((sum, c) => sum + getBullHeads(c), 0);
                player.collected.push(...this.rows[rowIndex]);
                player.roundPenalty += penalty;
                
                this.logMessage(`${player.name} takes row ${rowIndex + 1} (${penalty} bull heads) because it already has 5 cards!`);
                this.rows[rowIndex] = [card];
            } else {
                this.rows[rowIndex].push(card);
                this.logMessage(`${player.name}'s card ${card} added to Row ${rowIndex + 1}.`);
            }
            
            this.resolvingIndex++;
            if (this.resolvingIndex >= this.playedCardsThisTurn.length) {
                this.endTurn();
            } else {
                this.updateUI();
            }
        }
    }
    
    humanTakeRow(rowIndex) {
        if (this.state !== 'waiting_row_take' || this.pendingRowTakeIndex === -1) return;
        
        const humanIndex = this.players.findIndex(p => p.type === 'human');
        if (this.pendingRowTakeIndex !== humanIndex) return;
        
        const card = this.playedCardsThisTurn[this.resolvingIndex].card;
        this.takeRow(rowIndex, humanIndex, card);
    }
    
    takeRow(rowIndex, playerIndex, card) {
        const player = this.players[playerIndex];
        const penalty = this.rows[rowIndex].reduce((sum, c) => sum + getBullHeads(c), 0);
        
        player.collected.push(...this.rows[rowIndex]);
        player.roundPenalty += penalty;
        
        this.logMessage(`${player.name} chooses to take Row ${rowIndex + 1}, collecting ${penalty} bull heads.`);
        this.rows[rowIndex] = [card];
        
        this.pendingRowTakeIndex = -1;
        this.resolvingIndex++;
        if (this.resolvingIndex >= this.playedCardsThisTurn.length) {
            this.endTurn();
        } else {
            this.state = 'revealed';
            this.updateUI();
        }
    }
    
    endTurn() {
        this.turn++;
        this.playedCardsThisTurn = [];
        this.resolvingIndex = 0;
        
        if (this.turn < 10) {
            this.state = 'playing_card';
            this.logMessage(`Turn ${this.turn} complete. Play a card for Turn ${this.turn + 1}.`);
        } else {
            this.endRound();
        }
        this.updateUI();
    }
    
    endRound() {
        this.players.forEach(p => {
            p.totalPenalty += p.roundPenalty;
            p.scoreHistory.push(p.roundPenalty);
        });
        
        this.logMessage(`Round ${this.round} ended! Penalty scores: ` + 
            this.players.map(p => `${p.name}: ${p.roundPenalty}`).join(', ')
        );
        
        let gameIsOver = false;
        if (this.maxRounds === 66) {
            gameIsOver = this.players.some(p => p.totalPenalty >= 66);
        } else {
            gameIsOver = (this.round >= this.maxRounds);
        }
        
        if (gameIsOver) {
            this.state = 'game_ended';
            
            let winner = this.players[0];
            this.players.forEach(p => {
                if (p.totalPenalty < winner.totalPenalty) {
                    winner = p;
                }
            });
            this.logMessage(`GAME OVER! ${winner.name} wins with only ${winner.totalPenalty} total bull heads!`);
        } else {
            this.state = 'round_ended';
        }
        this.updateUI();
    }
    
    // --- UI Rendering Sync ---
    
    logMessage(message) {
        const logContent = document.getElementById('game-log-content');
        if (!logContent) return;
        
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.innerHTML = `<span class="log-time">[Turn ${this.turn || 1}]</span> ${message}`;
        logContent.appendChild(entry);
        
        logContent.scrollTop = logContent.scrollHeight;
    }
    
    updateUI(searchAIThoughtReport = null) {
        this.renderRows();
        this.renderPlayerHand();
        this.renderScoreboard();
        this.renderPlayedCards();
        this.renderAIThoughtPanel(searchAIThoughtReport);
        this.renderActionButtons();
    }
    
    renderRows() {
        const rowsContainer = document.getElementById('rows-container');
        if (!rowsContainer) return;
        
        rowsContainer.innerHTML = '';
        
        this.rows.forEach((row, rIdx) => {
            const rowEl = document.createElement('div');
            rowEl.className = 'game-row';
            if (this.state === 'waiting_row_take' && this.pendingRowTakeIndex !== -1) {
                const pendingPlayer = this.players[this.pendingRowTakeIndex];
                if (pendingPlayer.type === 'human') {
                    rowEl.classList.add('row-takeable');
                    rowEl.addEventListener('click', () => this.humanTakeRow(rIdx));
                }
            }
            
            const rowHeader = document.createElement('div');
            rowHeader.className = 'row-header-info';
            const totalBulls = row.reduce((sum, c) => sum + getBullHeads(c), 0);
            rowHeader.innerHTML = `
                <span class="row-num">Row ${rIdx + 1}</span>
                <span class="row-bulls">${totalBulls} 🐂</span>
            `;
            rowEl.appendChild(rowHeader);
            
            const cardsContainer = document.createElement('div');
            cardsContainer.className = 'row-cards';
            
            row.forEach((cardVal, cardIdx) => {
                const cardEl = this.createCardElement(cardVal);
                if (cardIdx === row.length - 1) {
                    cardEl.classList.add('last-card-in-row');
                }
                cardsContainer.appendChild(cardEl);
            });
            
            for (let i = row.length; i < 5; i++) {
                const placeholder = document.createElement('div');
                placeholder.className = 'card-placeholder';
                placeholder.textContent = '+';
                cardsContainer.appendChild(placeholder);
            }
            
            rowEl.appendChild(cardsContainer);
            rowsContainer.appendChild(rowEl);
        });
    }
    
    renderPlayerHand() {
        const handContainer = document.getElementById('hand-container');
        if (!handContainer) return;
        
        handContainer.innerHTML = '';
        
        const humanPlayer = this.players.find(p => p.type === 'human');
        if (!humanPlayer) return;
        
        if (humanPlayer.hand.length === 0) {
            handContainer.innerHTML = '<div class="empty-hand-msg">No cards left in your hand.</div>';
            return;
        }
        
        humanPlayer.hand.forEach(cardVal => {
            const cardEl = this.createCardElement(cardVal, true);
            
            if (this.state === 'playing_card') {
                cardEl.addEventListener('click', () => {
                    document.querySelectorAll('#hand-container .game-card').forEach(c => c.classList.remove('selected'));
                    cardEl.classList.add('selected');
                    
                    const playBtn = document.getElementById('btn-play-selected');
                    if (playBtn) {
                        playBtn.disabled = false;
                        playBtn.dataset.card = cardVal;
                    }
                });
            } else {
                cardEl.classList.add('card-disabled');
            }
            
            handContainer.appendChild(cardEl);
        });
    }
    
    renderScoreboard() {
        const scoreboard = document.getElementById('scoreboard-table-body');
        if (!scoreboard) return;
        
        scoreboard.innerHTML = '';
        
        const sortedPlayers = [...this.players].sort((a, b) => a.totalPenalty - b.totalPenalty);
        
        sortedPlayers.forEach(p => {
            const tr = document.createElement('tr');
            if (p.type === 'human') tr.className = 'human-score-row';
            
            tr.innerHTML = `
                <td><strong>${p.name}</strong> <span class="agent-badge badge-${p.type}">${p.type.toUpperCase()}</span></td>
                <td>${p.roundPenalty}</td>
                <td><strong>${p.totalPenalty}</strong></td>
                <td>${p.scoreHistory.join(' &rarr; ') || '0'}</td>
            `;
            scoreboard.appendChild(tr);
        });
    }
    
    renderPlayedCards() {
        const container = document.getElementById('played-cards-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (this.playedCardsThisTurn.length === 0) {
            container.innerHTML = '<div class="empty-played-msg">Waiting for players to choose a card...</div>';
            return;
        }
        
        this.playedCardsThisTurn.forEach((play, index) => {
            const player = this.players[play.playerIndex];
            const isRevealed = (this.state === 'revealed' || this.state === 'resolving_card' || this.state === 'waiting_row_take');
            
            const cardWrapper = document.createElement('div');
            cardWrapper.className = 'played-card-wrapper';
            
            if (isRevealed && index === this.resolvingIndex) {
                cardWrapper.classList.add('currently-resolving');
            }
            
            const label = document.createElement('div');
            label.className = 'played-card-label';
            label.textContent = player.name;
            cardWrapper.appendChild(label);
            
            if (isRevealed) {
                const cardEl = this.createCardElement(play.card);
                cardWrapper.appendChild(cardEl);
            } else {
                const cardBack = document.createElement('div');
                cardBack.className = 'game-card card-back';
                cardBack.innerHTML = `
                    <div class="card-back-pattern">
                        <span>6</span>
                    </div>
                `;
                cardWrapper.appendChild(cardBack);
            }
            
            container.appendChild(cardWrapper);
        });
    }
    
    renderAIThoughtPanel(report) {
        const thoughtContent = document.getElementById('ai-thought-content');
        if (!thoughtContent) return;
        
        if (!report) {
            if (this.state === 'playing_card') {
                thoughtContent.innerHTML = '<div class="empty-thought-msg">Play a card to trigger AI Search simulations...</div>';
            } else if (this.state === 'ai_thinking') {
                thoughtContent.innerHTML = `
                    <div class="thinking-spinner-container">
                        <div class="thinking-spinner"></div>
                        <p>Search AI is evaluating hands across ${this.searchSimulations} Monte Carlo rollouts...</p>
                    </div>`;
            }
            return;
        }
        
        let html = `
            <div class="thought-report-header">
                <h3>🧠 ${report.playerName} Thought Analysis</h3>
                <p>Simulated <strong>${this.searchSimulations}</strong> game configurations with look-ahead depth of <strong>${this.searchDepth}</strong> turns.</p>
            </div>
            <div class="thought-metrics-grid">
        `;
        
        const maxScore = Math.max(...report.scores.map(s => s.score), 1);
        
        report.scores.forEach(s => {
            const isChosen = (s.card === report.chosen);
            const percentage = Math.max(5, (s.score / maxScore) * 100);
            
            let scoreColor = 'var(--accent-color)';
            if (s.score === 0) {
                scoreColor = '#10b981';
            } else if (s.score > 4) {
                scoreColor = '#ef4444';
            } else if (s.score <= 1.5) {
                scoreColor = '#34d399';
            }
            
            html += `
                <div class="thought-card-metric ${isChosen ? 'metric-chosen' : ''}">
                    <div class="metric-card-number">${s.card} <span class="metric-bulls">(${getBullHeads(s.card)}🐂)</span></div>
                    <div class="metric-bar-container">
                        <div class="metric-bar" style="width: ${percentage}%; background-color: ${scoreColor};"></div>
                    </div>
                    <div class="metric-value-report">
                        Expected penalty: <strong>${s.score.toFixed(1)}</strong>
                        ${isChosen ? '<span class="chosen-indicator-tag">Selected</span>' : ''}
                    </div>
                </div>
            `;
        });
        
        html += `</div>`;
        thoughtContent.innerHTML = html;
    }
    
    renderActionButtons() {
        const actionArea = document.getElementById('action-controls-area');
        if (!actionArea) return;
        
        actionArea.innerHTML = '';
        
        if (this.state === 'playing_card') {
            const playBtn = document.createElement('button');
            playBtn.id = 'btn-play-selected';
            playBtn.className = 'btn-action btn-primary';
            playBtn.textContent = 'Confirm Played Card';
            playBtn.disabled = true;
            playBtn.addEventListener('click', () => {
                const card = parseInt(playBtn.dataset.card);
                this.playHumanCard(card);
            });
            actionArea.appendChild(playBtn);
        } else if (this.state === 'revealed' || this.state === 'resolving_card') {
            const resolveBtn = document.createElement('button');
            resolveBtn.className = 'btn-action btn-accent';
            
            const isLast = (this.resolvingIndex === this.playedCardsThisTurn.length - 1);
            resolveBtn.textContent = isLast ? 'Finish Turn' : 'Place Next Card';
            resolveBtn.addEventListener('click', () => this.resolveNextCard());
            actionArea.appendChild(resolveBtn);
        } else if (this.state === 'waiting_row_take') {
            const warningText = document.createElement('div');
            warningText.className = 'action-warning-text';
            warningText.innerHTML = `⚠️ <strong>Row selection required.</strong> Click directly on one of the rows above to collect its cards.`;
            actionArea.appendChild(warningText);
        } else if (this.state === 'round_ended') {
            const nextRoundBtn = document.createElement('button');
            nextRoundBtn.className = 'btn-action btn-primary';
            nextRoundBtn.textContent = 'Start Next Round';
            nextRoundBtn.addEventListener('click', () => this.startRound());
            actionArea.appendChild(nextRoundBtn);
        } else if (this.state === 'game_ended') {
            const resetBtn = document.createElement('button');
            resetBtn.className = 'btn-action btn-accent';
            resetBtn.textContent = 'New Game';
            resetBtn.addEventListener('click', () => {
                document.getElementById('setup-modal').style.display = 'flex';
                document.getElementById('game-area').style.display = 'none';
            });
            actionArea.appendChild(resetBtn);
        }
    }
    
    createCardElement(number, isPlayable = false) {
        const bulls = getBullHeads(number);
        const cardEl = document.createElement('div');
        cardEl.className = 'game-card';
        cardEl.dataset.cardNum = number;
        cardEl.dataset.bulls = bulls;
        
        cardEl.classList.add(`card-bulls-${bulls}`);
        
        if (isPlayable) {
            cardEl.classList.add('playable-card');
        }
        
        cardEl.innerHTML = `
            <div class="card-corner corner-tl">${number}</div>
            <div class="card-corner corner-br">${number}</div>
            <div class="card-bull-icons">
                ${'🐂'.repeat(bulls)}
            </div>
            <div class="card-center-number">${number}</div>
        `;
        
        return cardEl;
    }
}

// --- Page Initialize Setup ---

document.addEventListener('DOMContentLoaded', () => {
    const game = new SixNimmtGame();
    window.sixNimmtGameInstance = game;
    
    const setupModal = document.getElementById('setup-modal');
    const gameArea = document.getElementById('game-area');
    const startBtn = document.getElementById('btn-start-game');
    
    if (startBtn && setupModal && gameArea) {
        startBtn.addEventListener('click', () => {
            const oppCount = parseInt(document.getElementById('select-opponents-count').value);
            const opponentType = document.getElementById('select-opponent-type').value;
            const searchDepth = parseInt(document.getElementById('select-search-depth').value);
            const searchSims = parseInt(document.getElementById('select-search-simulations').value);
            const maxRoundsVal = document.getElementById('select-rounds-count').value;
            
            game.searchDepth = searchDepth;
            game.searchSimulations = searchSims;
            game.maxRounds = maxRoundsVal === '66' ? 66 : parseInt(maxRoundsVal);
            
            const configs = [{ name: 'You', type: 'human' }];
            const names = ['Smart AI', 'Greedy AI', 'Random AI', 'Search AI'];
            
            if (opponentType === 'search') {
                configs.push({ name: 'Search AI', type: 'search' });
                for (let i = 1; i < oppCount; i++) {
                    configs.push({ name: `Smart AI ${i}`, type: 'smart' });
                }
            } else if (opponentType === 'mixed') {
                configs.push({ name: 'Search AI', type: 'search' });
                if (oppCount > 1) configs.push({ name: 'Smart AI', type: 'smart' });
                if (oppCount > 2) configs.push({ name: 'Greedy AI', type: 'greedy' });
                if (oppCount > 3) configs.push({ name: 'Random AI', type: 'random' });
            } else {
                for (let i = 0; i < oppCount; i++) {
                    configs.push({ name: `${names[i] || 'Opponent AI ' + (i+1)}`, type: opponentType });
                }
            }
            
            setupModal.style.display = 'none';
            gameArea.style.display = '';
            
            const logContent = document.getElementById('game-log-content');
            if (logContent) logContent.innerHTML = '';
            
            game.initGame(configs);
        });
    }
    
    // Dynamic settings display toggle
    const opponentTypeSelect = document.getElementById('select-opponent-type');
    const searchConfigFields = document.getElementById('search-config-fields');
    if (opponentTypeSelect && searchConfigFields) {
        const toggleSearchFields = () => {
            const val = opponentTypeSelect.value;
            if (val === 'search' || val === 'mixed') {
                searchConfigFields.style.display = 'block';
            } else {
                searchConfigFields.style.display = 'none';
            }
        };
        opponentTypeSelect.addEventListener('change', toggleSearchFields);
        toggleSearchFields(); // Init on load
    }
});
