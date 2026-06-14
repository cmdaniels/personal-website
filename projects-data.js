const projectsData = [
  {
    "id": "six-nimmt-ai",
    "title": "Beating \"6 Nimmt!\" with Monte Carlo Minimax Search",
    "image": "./images/thumbnails/six-nimmt-ai.webp",
    "imageAlt": "Scattered playing cards",
    "description": "Developed a simulator environment and a Monte Carlo minimax search AI agent that consistently outperformed DQN and heuristic models in the card game \"6 Nimmt!\"",
    "tags": ["Artificial Intelligence", "Monte Carlo", "Python"],
    "link": "./projects/six-nimmt.html",
    "featured": true
  },
  {
    "id": "rauma-jaaritus-translation",
    "title": "<em>Raumlaissi jaarituksi</em>",
    "image": "./images/thumbnails/rauma-jaaritus-translation.webp",
    "imageAlt": "Chipped paint from an old wall in Rauma",
    "description": "An interactive translation of Frans Hjalmar Nortamo's short story \"Antonim bäev\" from the collection <em>Raumlaissi jaarituksi</em>.",
    "tags": ["Translation", "Linguistics", "Rauma"],
    "link": "./projects/raumlaissi-jaarituksi.html",
    "featured": true
  },
  {
    "id": "bird-calls-cnn",
    "title": "Convolutional Neural Network for Identifying Bird Calls",
    "image": "./images/thumbnails/bird-calls-cnn.webp",
    "imageAlt": "A flock of geese taking off",
    "description": "Explored deep learning architectures (Transformers and CNNs) for bird song classification, achieving state-of-the-art accuracy with a fine-tuned VGG-11 model.",
    "tags": ["Deep Learning", "Audio"],
    "link": "./projects/bird-calls-cnn.html",
    "featured": true
  },
  {
    "id": "post-date-text",
    "title": "The Post-Date Text",
    "image": "./images/thumbnails/post-date-text.webp",
    "imageAlt": "Smartphone displaying chat bubbles",
    "description": "A sociolinguistic study analyzing post-date text messages to determine common techniques for signaling romantic interest.",
    "tags": ["Sociolinguistics", "Computer-Mediated Communication", "Pragmatics"],
    "link": "./projects/post-date-text.html",
    "featured": true
  },
  {
    "id": "taikatalvi",
    "title": "<em>Taikatalvi</em>",
    "image": "./images/thumbnails/taikatalvi.webp",
    "imageAlt": "A snowy, mysterious winter forest capturing the atmosphere of Moominland Midwinter",
    "description": "A digital <em>aapinen</em> (primer) inspired by and with excerpts from Tove Jansson's classic Moomin novel <em>Taikatalvi</em>.",
    "tags": ["Web Design", "Finnish"],
    "link": "https://taikatalvi.vercel.app/",
    "featured": true
  },
  {
    "id": "rauma-translator",
    "title": "Finnish to Rauma NMT",
    "image": "./images/thumbnails/rauma-translator.webp",
    "imageAlt": "A cobblestone street with colorful houses in Old Rauma",
    "description": "A corpus and neural machine translator from standard written Finnish to Rauman Giäl.",
    "tags": ["Machine Translation", "NLP"],
    "link": "./files/Masiingäänttär.pdf",
    "featured": true
  },
  {
    "id": "conways-game-of-life",
    "title": "Conway's Game of Life",
    "image": "./images/thumbnails/conways-game-of-life.webp",
    "imageAlt": "Abstract cellular pixel grid pattern",
    "description": "An interactive simulation of John Horton Conway's cellular automaton, implemented in React.",
    "tags": ["React", "Automata"],
    "link": "https://codepen.io/cmdaniels/full/wGYmBm/",
    "featured": true
  },
  {
    "id": "kikuyu-fieldwork",
    "title": "Kikuyu Grammar Sketch",
    "image": "./images/thumbnails/kikuyu-fieldwork.webp",
    "imageAlt": "Vintage ink pen writing in a notebook",
    "description": "A wide-ranging description of the grammatical structures of Kikuyu constructed with the help of a native consultant.",
    "tags": ["Fieldwork", "IPA", "Morphosyntax"],
    "link": "./projects/kikuyu-fieldwork.html",
    "featured": true
  },
  {
    "id": "finnish-rauma-fst",
    "title": "Finnish to Rauma FST",
    "image": "./images/thumbnails/finnish-rauma-fst.webp",
    "imageAlt": "A boat on the shore somewhere in Rauma",
    "description": "A finite-state transducer built with XFST rules that transforms standard Finnish surface forms into Rauman Giäl.",
    "tags": ["Computational Linguistics", "FST", "Machine Translation"],
    "link": "./files/Finnish2RaumaFST.pdf",
    "featured": false
  },
  {
    "id": "demonym-affix-productivity",
    "title": "Demonym Affix Productivity and Conditioning",
    "image": "./images/thumbnails/demonym-affix-productivity.webp",
    "imageAlt": "World map with many pins",
    "description": "A survey-based study attempting to measure the productivity of six common demonym affixes.",
    "tags": ["Morphology", "Linguistics", "Data Analysis"],
    "link": "./files/DemonymAffixProductivity.pdf",
    "featured": false
  },
  {
    "id": "fshs-design-study",
    "title": "FSHS Onboarding Design Study",
    "image": "./images/thumbnails/fshs-design-study.webp",
    "imageAlt": "A bunch of wireframes drawn on graph paper",
    "description": "A human-computer interaction study detailing multiple design iterations for an efficient online patient onboarding for the Finnish Student Health Service.",
    "tags": ["HCI", "UX Design", "Wireframing"],
    "link": "./files/FSHSDesignStudy.pdf",
    "featured": false
  },
  {
    "id": "bayesian-recipe-labeling",
    "title": "Bayesian Recipe Labeler",
    "image": "./images/thumbnails/bayesian-recipe-labeling.webp",
    "imageAlt": "An iPad sits on a kitchen counter",
    "description": "Automated classification for recipes based on ingredient lists using a naïve Bayesian estimator, achieving about 70% accuracy in predicting food genres.",
    "tags": ["Machine Learning", "Naïve Bayes", "Python"],
    "link": "./files/BayesianRecipeLabeling.pdf",
    "featured": false
  },
  {
    "id": "flashcard-generator",
    "title": "Anki Flashcard Generator",
    "image": "./images/thumbnails/flashcard-generator.webp",
    "imageAlt": "A hand writing on a paper on a wooden table",
    "description": "A Python script for generating structured, customizable spaced-repetition flashcards in any language.",
    "tags": ["Python", "Anki"],
    "link": "https://github.com/cmdaniels/flashcard-gen",
    "featured": false
  },
  {
    "id": "finnish-library",
    "title": "Finnish Python Library",
    "image": "./images/thumbnails/finnish-library.webp",
    "imageAlt": "Python programming syntax highlighting code screen",
    "description": "A Python library for Finnish morphology that conjugates verbs and declines nouns into all forms.",
    "tags": ["Python", "Morphology"],
    "link": "https://github.com/cmdaniels/fi-lib",
    "featured": false
  },
  {
    "id": "finnish-cases-eval",
    "title": "Evaluating Masked Language Model Understanding",
    "image": "./images/thumbnails/finnish-cases-eval.webp",
    "imageAlt": "Grand academic library with books and study vaults",
    "description": "Measured FinBERT and XLM-RoBERTa performance on Finnish case morphology, showing FinBERT achieved 90%+ accuracy for education applications.",
    "tags": ["Computational Linguistics", "BERT", "Finnish"],
    "link": "./files/Evaluating Masked Language Model Understanding of Finnish Cases.pdf",
    "featured": false
  },
  {
    "id": "comet-mt-eval",
    "title": "Adapting COMET for Low-Resource MT",
    "image": "./images/thumbnails/comet-mt-eval.webp",
    "imageAlt": "A comet flying in the starry night sky",
    "description": "Fine-tuned COMET models to support quality evaluation for low-resource languages (Haitian Creole, Kiribati, Marshallese, and Navajo).",
    "tags": ["Machine Translation", "COMET", "NLP"],
    "link": "./files/Adapting_COMET_for_LRLs.pdf",
    "featured": false
  },
  {
    "id": "grammar-checking-token",
    "title": "Grammar Checking via Token Classification",
    "image": "./images/thumbnails/grammar-checking-token.webp",
    "imageAlt": "A random assortment of word magnets",
    "description": "Fine-tuned BERT, XLNet, and ALBERT to perform grammar checking as a token classification task, deploying the best model via Flask and Redis.",
    "tags": ["NLP", "Text Classification", "Flask"],
    "link": "./files/Grammar_Checking_as_a_Token_Classification_Task.pdf",
    "featured": false
  },
  {
    "id": "linguist-llm",
    "title": "LinguistLLM Research Project",
    "image": "./images/thumbnails/linguist-llm.webp",
    "imageAlt": "An old dictionary lays open on a pile of books",
    "description": "Experimented with fine-tuning and prompt engineering with linguistic data to improve machine translation for low-resource languages like Khmer and Quechua.",
    "tags": ["Machine Translation", "NLP"],
    "link": "./files/LinguistLLM.pdf",
    "featured": false
  },
  {
    "id": "twitter-mood",
    "title": "Twitter Mood Light",
    "image": "./images/thumbnails/twitter-mood.webp",
    "imageAlt": "A blurry orange dot on a light blue background",
    "description": "A sentiment analysis script that analyzes Twitter API streams and updates an LED.",
    "tags": ["APIs", "Data Mining"],
    "link": "https://github.com/cmdaniels/twitter-mood",
    "featured": false
  },
  {
    "id": "old-french-case-system",
    "title": "Loss of Two-case System in Old French",
    "image": "./images/thumbnails/old-french-case-system.webp",
    "imageAlt": "An open book floating in a circular stack of books",
    "description": "An analysis investigating the collapse of the Old French two-case morphological system.",
    "tags": ["Historical Linguistics", "Syntax", "Old French"],
    "link": "./files/OldFrenchCaseSystem.pdf",
    "featured": false
  },
  {
    "id": "morph-typology-baltic-tocharian",
    "title": "Morphological Typology of Baltic and Tocharian",
    "image": "./images/thumbnails/morph-typology-baltic-tocharian.webp",
    "imageAlt": "Someone reading a book in their lap",
    "description": "An exploration of the morphological typology of the Baltic and Tocharian branches of Proto-Indo-European, contrasting Lithuanian's preserved fusional case system with Tocharian's agglutinative developments possibly sparked by language contact.",
    "tags": ["Morphology", "Historical Linguistics", "Indo-European"],
    "link": "./files/MorphTypologyBalticTocharian.pdf",
    "featured": false
  },
  {
    "id": "udmurt-lexical-development",
    "title": "Analysis of Udmurt Language Policy",
    "image": "./images/thumbnails/udmurt-lexical-development.webp",
    "imageAlt": "A Russian Orthodox cathedral in the Udmurt Republic",
    "description": "An examination of how shifting language policies in the Soviet sphere have deeply impacted the lexical development and status of the Udmurt language.",
    "tags": ["Language Policy", "Sociolinguistics", "Udmurt"],
    "link": "./files/UdmurtLexicalDev.pdf",
    "featured": false
  },
  {
    "id": "canadian-language-policy",
    "title": "Analysis of Canadian Language Policy",
    "image": "./images/thumbnails/canadian-language-policy.webp",
    "imageAlt": "The Canadian flag blowing in the wind",
    "description": "A critical analysis of Canada's language education policies, examining how the nation's bilingual framework simplifies its multilingual reality and perpetuates colonial biases.",
    "tags": ["Language Policy", "Education", "Sociolinguistics"],
    "link": "./files/CanadianLanguageEduPolicy.pdf",
    "featured": false
  },
  {
    "id": "language-study-guide",
    "title": "Language Guide for International Volunteers",
    "image": "./images/thumbnails/language-study-guide.webp",
    "imageAlt": "A view of the Helsinki cathedral and harbor",
    "description": "Authored a comprehensive Finnish language study guide standardizing independent learning for 70+ volunteers.",
    "tags": ["Language Teaching", "Instructional Design", "Finnish"],
    "link": "./files/FHM Language Guide v2.pdf",
    "featured": false
  }
];
