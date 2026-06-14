document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.getElementById('interpreter-input');
  const analyzeBtn = document.getElementById('analyze-btn');
  const resultPanel = document.getElementById('interpreter-result');
  const verdictTitle = document.getElementById('verdict-title');
  const verdictNarrative = document.getElementById('verdict-narrative');
  const genderBtns = document.querySelectorAll('.gender-toggle-btn');

  let selectedGender = 'male'; // default

  // Gender toggle
  genderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      genderBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedGender = btn.getAttribute('data-gender');
    });
  });

  // Feature detection helpers
  const EMOJI_REGEX = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F000}-\u{1FFFF}]/u;

  const ENDEARMENT_WORDS = [
    'babe', 'baby', 'dear', 'sweetie', 'honey', 'hun', 'love', 'darling',
    'angel', 'sweetheart', 'cutie'
  ];

  const COMPLIMENT_PHRASES = [
    'handsome', 'beautiful', 'pretty', 'gorgeous', 'cute', 'amazing', 'wonderful',
    'great time', 'so much fun', 'had a blast', 'best date', 'such a good time',
    'loved it', 'so fun', 'so great', 'really enjoyed', 'loved hanging', 'loved spending',
    'so kind', 'so sweet', 'such a gentleman', 'such a lady', 'you\'re great',
    'you\'re the best', 'really cool', 'really funny', 'so funny'
  ];

  const GRATITUDE_PHRASES = [
    'thank you', 'thanks', 'appreciate', 'grateful', 'thankful', 'so thoughtful',
    'thx', 'ty'
  ];

  const SAFETY_PHRASES = [
    'get home safe', 'home safe', 'safe home', 'made it back', 'made it home',
    'get back safe', 'drive safe', 'drive safely', 'be safe', 'stay safe',
    'let me know when you\'re home', 'let me know you made it', 'text me when home'
  ];

  const PHOTO_PHRASES = [
    'here is', 'here\'s', 'sending you', 'pic', 'photo', 'image', 'picture', 'selfie'
  ];

  function detectFeatures(text, gender) {
    const lower = text.toLowerCase().trim();
    const words = lower.split(/\s+/).filter(w => w.length > 0);

    return {
      isEmpty: text.trim().length === 0,
      wordCount: words.length,
      hasEmoji: EMOJI_REGEX.test(text),
      hasEndearment: ENDEARMENT_WORDS.some(w => lower.includes(w)),
      hasCompliment: COMPLIMENT_PHRASES.some(p => lower.includes(p)),
      hasGratitude: GRATITUDE_PHRASES.some(p => lower.includes(p)),
      hasSafetyConcern: SAFETY_PHRASES.some(p => lower.includes(p)),
      hasExclamation: text.includes('!'),
      hasAllCaps: /\b[A-Z]{2,}\b/.test(text),
      isPhotosOnly: words.length <= 3 && PHOTO_PHRASES.some(p => lower.includes(p)),
      gender
    };
  }

  function classify(f) {
    // No text at all
    if (f.isEmpty) {
      return {
        level: 'none',
        title: 'No Message Sent',
        narrative: 'The silence says it all. According to the study, not sending any post-date text is the strongest negative signal — with the average desire for a follow-up date plummeting when no message is sent. The absence of a text communicates disinterest more clearly than any words could.'
      };
    }

    // Photos only — a strong negative marker
    if (f.isPhotosOnly) {
      return {
        level: 'low',
        title: 'Platonic / Low Intent',
        narrative: 'Sending only a photo without accompanying words is one of the weakest post-date signals. The study found that texts consisting solely of images or media correlate with the same low follow-up desire as sending no text at all. It\'s not a signal of romantic interest.'
      };
    }

    // Very short texts with no warm markers — ambiguous or platonic
    if (f.wordCount <= 4 && !f.hasEmoji && !f.hasEndearment && !f.hasCompliment && !f.hasSafetyConcern && !f.hasGratitude) {
      return {
        level: 'low',
        title: 'Platonic / Low Intent',
        narrative: 'This message is too brief to carry meaningful pragmatic weight. A very short text without any warm markers — no emojis, no compliments, no gratitude — tends to read as a perfunctory acknowledgment rather than a signal of romantic interest.'
      };
    }

    // Short text with only gratitude (but nothing else)
    if (f.wordCount <= 6 && f.hasGratitude && !f.hasEmoji && !f.hasEndearment && !f.hasCompliment && !f.hasSafetyConcern && !f.hasExclamation) {
      return {
        level: 'neutral',
        title: 'Polite Pleasantry',
        narrative: 'A brief expression of gratitude without any additional markers fulfills the social script of the post-date text — but nothing more. The study found this is the most common type of message, and it functions as a courtesy rather than a signal of romantic intent.'
      };
    }

    // Count positive signals
    let positiveSignals = 0;
    const signals = [];

    if (f.hasEndearment) {
      positiveSignals += 2;
      signals.push('a term of endearment');
    }
    if (f.hasCompliment) {
      positiveSignals += 2;
      signals.push('a compliment');
    }
    if (f.hasSafetyConcern) {
      positiveSignals += 1.5;
      signals.push('a safety check-in');
    }
    if (f.hasEmoji) {
      positiveSignals += 1.5;
      signals.push('an emoji');
    }
    if (f.hasAllCaps) {
      // All-caps is a strong female indicator; neutral for males
      if (f.gender === 'female') {
        positiveSignals += 1.5;
        signals.push('an all-caps expression');
      } else {
        positiveSignals += 0.5;
        signals.push('an all-caps expression');
      }
    }
    if (f.hasExclamation) {
      positiveSignals += 0.5;
    }
    if (f.wordCount >= 15) {
      positiveSignals += 1.5;
    } else if (f.wordCount >= 8) {
      positiveSignals += 0.5;
    }

    // Gratitude — gender-differentiated
    if (f.hasGratitude) {
      if (f.gender === 'male') {
        positiveSignals += 2;
        signals.push('gratitude');
      } else {
        // Female gratitude is a pleasantry — neutral weight
        positiveSignals += 0.25;
        signals.push('gratitude');
      }
    }

    // Build narrative
    const signalText = signals.length > 0
      ? `The message contains ${formatList(signals)}, which the study identifies as positive pragmatic markers.`
      : '';

    if (positiveSignals >= 4) {
      const wordCountNote = f.wordCount >= 10
        ? ' The message\'s length alone is a strong predictor of romantic intent — the study found the highest correlation between word count and desire for a follow-up date.'
        : '';
      return {
        level: 'high',
        title: 'High Romantic Interest',
        narrative: `This message carries several strong signals of affection and romantic interest. ${signalText}${wordCountNote} Together, these markers suggest the sender is genuinely invested in the relationship and interested in a follow-up.`
      };
    }

    if (positiveSignals >= 2) {
      // Gender-modulated middle tier
      if (f.hasGratitude && !f.hasCompliment && !f.hasEndearment && !f.hasEmoji && !f.hasSafetyConcern && f.gender === 'female') {
        return {
          level: 'neutral',
          title: 'Polite Pleasantry',
          narrative: `This message reads as a courteous social obligation rather than an expression of deep interest. ${signalText} The study found that expressions of gratitude from women tend to function as pleasantries — a fulfillment of the post-date social script — rather than as strong signals of romantic affection.`
        };
      }
      return {
        level: 'moderate',
        title: 'Mild Positive Interest',
        narrative: `This message shows some warmth, but stops short of the strongest signals of romantic intent. ${signalText} The study suggests this kind of text is a gentle positive indicator — it communicates goodwill and keeps the door open, but doesn\'t signal strong pursuit.`
      };
    }

    // Low, just gratitude without strong markers
    if (f.hasGratitude && positiveSignals < 2) {
      return {
        level: 'neutral',
        title: 'Polite Pleasantry',
        narrative: `This message fulfills the social expectation of a post-date text without going beyond it. ${signalText} A simple expression of gratitude is the most common post-date message — but without additional markers like emojis, compliments, or endearments, it reads more as courtesy than courtship.`
      };
    }

    return {
      level: 'low',
      title: 'Platonic / Low Intent',
      narrative: 'This message does not contain the linguistic markers the study associates with romantic interest. While sending any text is technically a small positive, the absence of emojis, compliments, endearments, or personal detail places this firmly in the territory of a social formality.'
    };
  }

  function formatList(items) {
    if (items.length === 0) return '';
    if (items.length === 1) return items[0];
    if (items.length === 2) return `${items[0]} and ${items[1]}`;
    return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
  }

  analyzeBtn.addEventListener('click', () => {
    const text = textarea.value;
    const features = detectFeatures(text, selectedGender);
    const result = classify(features);

    // Set content
    verdictTitle.textContent = result.title;
    verdictTitle.dataset.level = result.level;
    verdictNarrative.textContent = result.narrative;

    // Show panel with animation
    resultPanel.classList.remove('visible');
    // Force reflow to restart the animation
    void resultPanel.offsetWidth;
    resultPanel.classList.add('visible');
    resultPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  // Allow Enter in textarea without submitting (Shift+Enter = newline, already default)
  // Allow Ctrl/Cmd+Enter to trigger analysis
  textarea.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      analyzeBtn.click();
    }
  });
});
