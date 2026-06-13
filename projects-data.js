const projectsData = [
  {
    "id": "six-nimmt-ai",
    "title": "Beating \"6 Nimmt!\" with Monte Carlo Search",
    "image": "./images/thumbnails/six-nimmt-ai.webp",
    "imageAlt": "Hand holding numbered playing cards on table",
    "description": "Developed a simulator environment and a Monte Carlo minimax search AI agent that consistently outperformed DQN and heuristic models in the card game \"6 Nimmt!\"",
    "tags": ["Artificial Intelligence", "Monte Carlo", "Python"],
    "link": "./files/6 nimmt.pdf",
    "featured": true
  },
  {
    "id": "bird-calls-cnn",
    "title": "CNN for Identifying Bird Calls",
    "image": "./images/thumbnails/bird-calls-cnn.webp",
    "imageAlt": "Colorful wild songbird singing on a branch in a forest",
    "description": "Explored deep learning architectures (Transformers and CNNs) for bird song classification, achieving state-of-the-art accuracy with a fine-tuned VGG-11 model.",
    "tags": ["Deep Learning", "Audio"],
    "link": "./files/BirdNet.pdf",
    "featured": true
  },
  {
    "id": "post-date-text",
    "title": "The Post-date Text",
    "image": "./images/thumbnails/post-date-text.webp",
    "imageAlt": "Smartphone displaying chat bubbles",
    "description": "A sociolinguistic study analyzing post-date text messages to determine common communicative elements, signs of affection, and how certain gender-specific expressions signal romantic interest.",
    "tags": ["Sociolinguistics", "Computer-Mediated Communication", "Pragmatics"],
    "link": "./files/PostDateText.pdf",
    "featured": true
  },
  {
    "id": "taikatalvi",
    "title": "<em>Taikatalvi</em>",
    "image": "./images/thumbnails/taikatalvi.webp",
    "imageAlt": "A snowy, mysterious winter forest capturing the atmosphere of Moominland Midwinter",
    "description": "A digital primer (<em>aapinen</em>) inspired by Tove Jansson's classic Moomin novel <em>Taikatalvi</em>.",
    "tags": ["Web Design", "Finnish"],
    "link": "https://taikatalvi.vercel.app/",
    "featured": true
  },
  {
    "id": "rauma-translator",
    "title": "Finnish to Rauma NMT",
    "image": "./images/thumbnails/rauma-translator.webp",
    "imageAlt": "Multilingual dictionary pages detailing linguistic translations",
    "description": "A corpus and neural machine translator from standard written Finnish to Rauman Giäl dialect.",
    "tags": ["Machine Translation", "NLP"],
    "link": "./files/Masiingäänttär.pdf",
    "featured": true
  },
  {
    "id": "conways-game-of-life",
    "title": "Conway's Game of Life",
    "image": "./images/thumbnails/conways-game-of-life.webp",
    "imageAlt": "Abstract high-tech cellular pixel grid pattern",
    "description": "An interactive simulation of John Horton Conway's cellular automaton, implemented in React.",
    "tags": ["React", "Interactivity"],
    "link": "https://codepen.io/cmdaniels/full/wGYmBm/",
    "featured": true
  },
  {
    "id": "kikuyu-fieldwork",
    "title": "Language Documentation: Kikuyu (Gĩkũyũ)",
    "image": "./images/thumbnails/kikuyu-fieldwork.webp",
    "imageAlt": "Vintage ink pen writing in fieldwork notebooks",
    "description": "Documented the grammatical structures of Kikuyu with a native consultant.",
    "tags": ["Fieldwork", "IPA", "Morphosyntax"],
    "link": "./files/Field Notebook.pdf",
    "featured": true
  },
  {
    "id": "rauma-jaaritus-translation",
    "title": "<em>Raumlaissi jaarituksi</em>",
    "image": "./images/thumbnails/rauma-jaaritus-translation.webp",
    "imageAlt": "Old wooden timber houses street in historical Rauma town",
    "description": "Literary translation of Frans Hjalmar Nortamo's short story 'Antonim bäev' from the collection <em>Raumlaissi jaarituksi</em>.",
    "tags": ["Translation", "Linguistics", "Rauma Dialect"],
    "link": "./raumlaissi-jaarituksi.html",
    "featured": true
  },
  {
    "id": "finnish-rauma-fst",
    "title": "Finnish to Rauma FST",
    "image": "./images/thumbnails/finnish-rauma-fst.webp",
    "imageAlt": "Code editor showing XFST rules and generated morphological tags",
    "description": "A finite-state transducer built with XFST rules that transforms standard Finnish surface forms into the Rauma dialect.",
    "tags": ["Computational Linguistics", "FST", "Machine Translation"],
    "link": "./files/Finnish2RaumaFST.pdf",
    "featured": false
  },
  {
    "id": "demonym-affix-productivity",
    "title": "Demonym Affix Productivity and Conditioning",
    "image": "./images/thumbnails/demonym-affix-productivity.webp",
    "imageAlt": "World map overlaid with statistical bar charts",
    "description": "A survey-based study attempting to measure the productivity of six common demonym affixes.",
    "tags": ["Morphology", "Linguistics", "Data Analysis"],
    "link": "./files/DemonymAffixProductivity.pdf",
    "featured": false
  },
  {
    "id": "fshs-design-study",
    "title": "FSHS Onboarding Design Study",
    "image": "./images/thumbnails/fshs-design-study.webp",
    "imageAlt": "Low-fidelity and medium-fidelity UI wireframe sketches",
    "description": "A human-computer interaction study detailing multiple design iterations for an efficient online patient onboarding for the Finnish Student Health Service.",
    "tags": ["HCI", "UX Design", "Wireframing"],
    "link": "./files/FSHSDesignStudy.pdf",
    "featured": false
  },
  {
    "id": "bayesian-recipe-labeling",
    "title": "Bayesian Recipe Labeler",
    "image": "./images/thumbnails/bayesian-recipe-labeling.webp",
    "imageAlt": "Ingredients and data modeling visualization",
    "description": "Automated classification for recipes based on ingredient lists using a naïve Bayesian estimator, achieving about 70% accuracy in predicting food genres.",
    "tags": ["Machine Learning", "Naïve Bayes", "Python"],
    "link": "./files/BayesianRecipeLabeling.pdf",
    "featured": false
  },
  {
    "id": "flashcard-generator",
    "title": "Anki Flashcard Generator",
    "image": "./images/thumbnails/flashcard-generator.webp",
    "imageAlt": "Study notebooks and handwritten learning index cards",
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
    "imageAlt": "High-tech motherboard circuitry representing computer evaluation networks",
    "description": "Fine-tuned COMET models to support quality evaluation for low-resource languages (Haitian Creole, Kiribati, Marshallese, and Navajo).",
    "tags": ["Machine Translation", "COMET", "NLP"],
    "link": "./files/Adapting_COMET_for_LRLs.pdf",
    "featured": false
  },
  {
    "id": "grammar-checking-token",
    "title": "Grammar Checking via Token Classification",
    "image": "./images/thumbnails/grammar-checking-token.webp",
    "imageAlt": "Hand correcting text document with pen on study desk",
    "description": "Fine-tuned BERT, XLNet, and ALBERT to perform grammar checking as a token classification task, deploying the best model via Flask and Redis.",
    "tags": ["NLP", "Text Classification", "Flask"],
    "link": "./files/Grammar_Checking_as_a_Token_Classification_Task.pdf",
    "featured": false
  },
  {
    "id": "linguist-llm",
    "title": "LinguistLLM Research Project",
    "image": "./images/thumbnails/linguist-llm.webp",
    "imageAlt": "Neural network graphic connecting languages",
    "description": "Experimented with fine-tuning and prompt engineering with linguistic data to improve machine translation for low-resource languages like Khmer and Quechua.",
    "tags": ["Machine Translation", "NLP"],
    "link": "./files/LinguistLLM.pdf",
    "featured": false
  },
  {
    "id": "twitter-mood",
    "title": "Twitter Mood Light",
    "image": "./images/thumbnails/twitter-mood.webp",
    "imageAlt": "Digital smartphone screen showing social network status connections",
    "description": "A sentiment analysis script that analyzes Twitter API streams and updates an LED.",
    "tags": ["APIs", "Data Mining"],
    "link": "https://github.com/cmdaniels/twitter-mood",
    "featured": false
  },
  {
    "id": "old-french-case-system",
    "title": "Loss of Two-case System in Old French",
    "image": "./images/thumbnails/old-french-case-system.webp",
    "imageAlt": "Medieval French text illuminated manuscript",
    "description": "An analysis investigating the collapse of the Old French two-case morphological system.",
    "tags": ["Historical Linguistics", "Syntax", "Old French"],
    "link": "./files/OldFrenchCaseSystem.pdf",
    "featured": false
  },
  {
    "id": "morph-typology-baltic-tocharian",
    "title": "Morphological Typology of Baltic and Tocharian",
    "image": "./images/thumbnails/morph-typology-baltic-tocharian.webp",
    "imageAlt": "Ancient linguistic manuscripts and morphological trees",
    "description": "An exploration of the morphological typology of the Baltic and Tocharian branches of Proto-Indo-European, contrasting Lithuanian's preserved fusional case system with Tocharian's agglutinative developments possibly sparked by language contact.",
    "tags": ["Morphology", "Historical Linguistics", "Indo-European"],
    "link": "./files/MorphTypologyBalticTocharian.pdf",
    "featured": false
  },
  {
    "id": "udmurt-lexical-development",
    "title": "Analysis of Udmurt Language Policy",
    "image": "./images/thumbnails/udmurt-lexical-development.webp",
    "imageAlt": "Map of the Uralic language regions in Russia",
    "description": "An examination of how shifting language policies in the Soviet sphere have deeply impacted the lexical development and status of the Udmurt language.",
    "tags": ["Language Policy", "Sociolinguistics", "Udmurt"],
    "link": "./files/UdmurtLexicalDev.pdf",
    "featured": false
  },
  {
    "id": "canadian-language-policy",
    "title": "Analysis of Canadian Language Policy",
    "image": "./images/thumbnails/canadian-language-policy.webp",
    "imageAlt": "Canadian flag and educational materials",
    "description": "A critical analysis of Canada's language education policies, examining how the nation's bilingual framework simplifies its multilingual reality and perpetuates colonial biases.",
    "tags": ["Language Policy", "Education", "Sociolinguistics"],
    "link": "./files/CanadianLanguageEduPolicy.pdf",
    "featured": false
  },
  {
    "id": "language-study-guide",
    "title": "Language Guide for International Volunteers",
    "image": "./images/thumbnails/language-study-guide.webp",
    "imageAlt": "Open textbooks and study resources showing grammar notes",
    "description": "Authored a comprehensive Finnish language study guide standardizing independent learning for 70+ volunteers.",
    "tags": ["Language Teaching", "Instructional Design", "Finnish"],
    "link": "./files/FHM Language Guide v2.pdf",
    "featured": false
  }
];
