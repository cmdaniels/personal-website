const projectsData = [
  {
    "id": "rauma-translator",
    "title": "Finnish to Rauma NMT",
    "image": "./images/unsplash/alex-inkilainen-OfZNe7YpCvA-unsplash.jpg",
    "imageAlt": "Finnish landscape with lake and pine forest",
    "description": "A neural machine translator from standard written Finnish to Rauman Giäl dialect, preserving local idioms.",
    "tags": ["Machine Translation", "NLP"],
    "link": "./files/Masiingäänttär.pdf",
    "featured": true
  },
  {
    "id": "flashcard-generator",
    "title": "Flashcard Generator",
    "image": "./images/unsplash/kyle-glenn-SrASYZZpyjw-unsplash.jpg",
    "imageAlt": "Green leafed pine forest",
    "description": "A Python script for generating structured, customizable spaced-repetition flashcards in any language.",
    "tags": ["Python", "Anki"],
    "link": "https://github.com/cmdaniels/flashcard-gen",
    "featured": true
  },
  {
    "id": "kikuyu-fieldwork",
    "title": "Linguistic Field Work: Kikuyu (Gĩkũyũ)",
    "image": "./images/unsplash/julius-jansson-5qg4vgMKD_w-unsplash.jpg",
    "imageAlt": "Fieldwork notebooks and papers",
    "description": "Documented the phonological and grammatical structures of Kikuyu with a native consultant, producing a multi-tier interlinear gloss of a traditional narrative.",
    "tags": ["Linguistic Fieldwork", "IPA", "Morphosyntax"],
    "link": "./files/Field Notebook.pdf",
    "featured": true
  },
  {
    "id": "six-nimmt-ai",
    "title": "Beating \"6 Nimmt!\" with Monte Carlo Search",
    "image": "./images/unsplash/saikrishna-saketh-yellapragada-DyDR8oOzuNA-unsplash.jpg",
    "imageAlt": "Gaming algorithm visuals",
    "description": "Developed a simulator environment and a Monte Carlo minimax search AI agent that consistently outperformed DQN and heuristic models.",
    "tags": ["Artificial Intelligence", "Monte Carlo", "Python"],
    "link": "./files/6 nimmt.pdf",
    "featured": true
  },
  {
    "id": "bird-calls-cnn",
    "title": "CNN for Identifying Bird Calls",
    "image": "./images/unsplash/saikrishna-saketh-yellapragada-DyDR8oOzuNA-unsplash.jpg",
    "imageAlt": "Wild bird visual waveforms",
    "description": "Explored deep learning architectures (Transformers and CNNs) for bird song classification, achieving state-of-the-art accuracy with a fine-tuned VGG-11 model.",
    "tags": ["Deep Learning", "CNNs", "Audio Spectrograms"],
    "link": "./files/BirdNet.pdf",
    "featured": true
  },
  {
    "id": "finnish-cases-eval",
    "title": "Evaluating Finnish Case Morphology",
    "image": "./images/unsplash/tapio-haaja-bpDJvls-h-0-unsplash.jpg",
    "imageAlt": "Historic Finnish library building",
    "description": "Measured FinBERT and XLM-RoBERTa performance on Finnish case morphology, showing FinBERT achieved 90%+ accuracy for education applications.",
    "tags": ["Computational Linguistics", "BERT", "Finnish"],
    "link": "./files/Evaluating Masked Language Model Understanding of Finnish Cases.pdf",
    "featured": true
  },
  {
    "id": "rauma-jaaritus-translation",
    "title": "Raumlaissi jaarituksi",
    "image": "./images/unsplash/tapio-haaja-z9LKMs0P3bo-unsplash.jpg",
    "imageAlt": "Finnish coastal town Rauma landscape",
    "description": "First-time literary English translation of Frans Hjalmar Nortamo's short story 'Antonim bäev' from the dialectal collection 'Raumlaissi jaarituksi'.",
    "tags": ["Translation", "Linguistics", "Rauma Dialect"],
    "link": "./files/Raumlaissi jaarituksi.pdf",
    "featured": false
  },
  {
    "id": "comet-mt-eval",
    "title": "Adapting COMET for Low-Resource MT",
    "image": "./images/unsplash/evgeni-evgeniev-LPKk3wtkC-g-unsplash.jpg",
    "imageAlt": "Abstract computing interface light patterns",
    "description": "Fine-tuned COMET models to support quality evaluation for low-resource languages (Haitian Creole, Kiribati, Marshallese, Navajo).",
    "tags": ["Machine Translation", "COMET", "NLP"],
    "link": "./files/Adapting_COMET_for_LRLs.pdf",
    "featured": false
  },
  {
    "id": "grammar-checking-token",
    "title": "Grammar Checking via Token Classification",
    "image": "./images/unsplash/dan-otis-OYFHT4X5isg-unsplash.jpg",
    "imageAlt": "Linguistic classification data close up",
    "description": "Fine-tuned BERT, XLNet, and ALBERT to perform grammar checking as a token classification task, deploying the best model via Flask and Redis.",
    "tags": ["NLP", "Text Classification", "Flask"],
    "link": "./files/Grammar_Checking_as_a_Token_Classification_Task.pdf",
    "featured": false
  },
  {
    "id": "language-study-guide",
    "title": "Language Guide for International Volunteers",
    "image": "./images/unsplash/thomas-griesbeck-BS-Uxe8wU5Y-unsplash.jpg",
    "imageAlt": "Stack of grammar study books",
    "description": "Authored a comprehensive Finnish language study guide standardizing independent learning for 70+ volunteers using an exemplar-based approach.",
    "tags": ["Language Teaching", "Instructional Design", "Finnish"],
    "link": "./files/FHM Language Guide v2.pdf",
    "featured": false
  },
  {
    "id": "twitter-mood",
    "title": "Twitter Mood Light",
    "image": "./images/unsplash/tapio-haaja-cJK3d95lPiM-unsplash.jpg",
    "imageAlt": "Gray rocks on seashore in Helsinki during sunset",
    "description": "A sentiment analysis script that analyzes Twitter API streams to generate real-time visual summaries of public emotional states.",
    "tags": ["APIs", "Data Mining"],
    "link": "https://github.com/cmdaniels/twitter-mood",
    "featured": false
  },
  {
    "id": "conways-game-of-life",
    "title": "Conway's Game of Life",
    "image": "./images/unsplash/alexandr-bormotin-w6KSwwnQyaE-unsplash.jpg",
    "imageAlt": "Abstract high-tech geometric tunnel grid",
    "description": "An interactive simulation of John Horton Conway's cellular automaton, implemented in React.",
    "tags": ["React", "Interactivity"],
    "link": "https://codepen.io/cmdaniels/full/wGYmBm/",
    "featured": true
  },
  {
    "id": "finnish-library",
    "title": "Finnish Library",
    "image": "./images/unsplash/tapio-haaja-I9SWvZ9sO2U-unsplash.jpg",
    "imageAlt": "Helsinki yellow and green city tram",
    "description": "A Python library for Finnish morphology that conjugates verbs and declines nouns into all forms.",
    "tags": ["Python", "Morphology"],
    "link": "https://github.com/cmdaniels/fi-lib",
    "featured": false
  },
];
