const projectsData = [
  {
    "id": "linguist-llm",
    "title": "LinguistLLM Research Project",
    "image": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    "imageAlt": "Neural network graphic connecting languages",
    "description": "Experimented with fine-tuning and prompt engineering with linguistic data to improve machine translation for low-resource languages like Khmer and Quechua.",
    "tags": ["Machine Translation", "NLP"],
    "link": "./files/LinguistLLM.pdf",
    "featured": true
  },
  {
    "id": "rauma-translator",
    "title": "Finnish to Rauma NMT",
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    "imageAlt": "Multilingual dictionary pages detailing linguistic translations",
    "description": "A corpus and neural machine translator from standard written Finnish to Rauman Giäl dialect.",
    "tags": ["Machine Translation", "NLP"],
    "link": "./files/Masiingäänttär.pdf",
    "featured": true
  },
  {
    "id": "bird-calls-cnn",
    "title": "CNN for Identifying Bird Calls",
    "image": "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?auto=format&fit=crop&w=800&q=80",
    "imageAlt": "Colorful wild songbird singing on a branch in a forest",
    "description": "Explored deep learning architectures (Transformers and CNNs) for bird song classification, achieving state-of-the-art accuracy with a fine-tuned VGG-11 model.",
    "tags": ["Deep Learning", "Audio"],
    "link": "./files/BirdNet.pdf",
    "featured": true
  },
  {
    "id": "finnish-cases-eval",
    "title": "Evaluating Masked Language Model Understanding",
    "image": "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=800&q=80",
    "imageAlt": "Grand academic library with books and study vaults",
    "description": "Measured FinBERT and XLM-RoBERTa performance on Finnish case morphology, showing FinBERT achieved 90%+ accuracy for education applications.",
    "tags": ["Computational Linguistics", "BERT", "Finnish"],
    "link": "./files/Evaluating Masked Language Model Understanding of Finnish Cases.pdf",
    "featured": true
  },
  {
    "id": "six-nimmt-ai",
    "title": "Beating \"6 Nimmt!\" with Monte Carlo Search",
    "image": "https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?auto=format&fit=crop&w=800&q=80",
    "imageAlt": "Hand holding numbered playing cards on table",
    "description": "Developed a simulator environment and a Monte Carlo minimax search AI agent that consistently outperformed DQN and heuristic models.",
    "tags": ["Artificial Intelligence", "Monte Carlo", "Python"],
    "link": "./files/6 nimmt.pdf",
    "featured": true
  },
  {
    "id": "grammar-checking-token",
    "title": "Grammar Checking via Token Classification",
    "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    "imageAlt": "Hand correcting text document with pen on study desk",
    "description": "Fine-tuned BERT, XLNet, and ALBERT to perform grammar checking as a token classification task, deploying the best model via Flask and Redis.",
    "tags": ["NLP", "Text Classification", "Flask"],
    "link": "./files/Grammar_Checking_as_a_Token_Classification_Task.pdf",
    "featured": true
  },
  {
    "id": "comet-mt-eval",
    "title": "Adapting COMET for Low-Resource MT",
    "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    "imageAlt": "High-tech motherboard circuitry representing computer evaluation networks",
    "description": "Fine-tuned COMET models to support quality evaluation for low-resource languages (Haitian Creole, Kiribati, Marshallese, and Navajo).",
    "tags": ["Machine Translation", "COMET", "NLP"],
    "link": "./files/Adapting_COMET_for_LRLs.pdf",
    "featured": true
  },
  {
    "id": "finnish-rauma-fst",
    "title": "Finnish to Rauma FST",
    "image": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    "imageAlt": "Code editor showing XFST rules and generated morphological tags",
    "description": "A finite-state transducer built with XFST rules that transforms standard Finnish surface forms into the Rauma dialect.",
    "tags": ["Computational Linguistics", "FST", "Machine Translation"],
    "link": "./files/Finnish2RaumaFST.pdf",
    "featured": true
  },
  {
    "id": "kikuyu-fieldwork",
    "title": "Language Documentation: Kikuyu (Gĩkũyũ)",
    "image": "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    "imageAlt": "Vintage ink pen writing in fieldwork notebooks",
    "description": "Documented the grammatical structures of Kikuyu with a native consultant.",
    "tags": ["Fieldwork", "IPA", "Morphosyntax"],
    "link": "./files/Field Notebook.pdf",
    "featured": false
  },
  {
    "id": "bayesian-recipe-labeling",
    "title": "Bayesian Recipe Labeler",
    "image": "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80",
    "imageAlt": "Ingredients and data modeling visualization",
    "description": "Automated classification for recipes based on ingredient lists using a naïve Bayesian estimator, achieving about 70% accuracy in predicting food genres.",
    "tags": ["Machine Learning", "Naïve Bayes", "Python"],
    "link": "./files/BayesianRecipeLabeling.pdf",
    "featured": false
  },
  {
    "id": "demonym-affix-productivity",
    "title": "Demonym Affix Productivity and Conditioning",
    "image": "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80",
    "imageAlt": "World map overlaid with statistical bar charts",
    "description": "A survey-based study attempting to measure the productivity of six common demonym affixes.",
    "tags": ["Morphology", "Linguistics", "Data Analysis"],
    "link": "./files/DemonymAffixProductivity.pdf",
    "featured": false
  },
  {
    "id": "morph-typology-baltic-tocharian",
    "title": "Morphological Typology of Baltic and Tocharian",
    "image": "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=800&q=80",
    "imageAlt": "Ancient linguistic manuscripts and morphological trees",
    "description": "An exploration of the morphological typology of the Baltic and Tocharian branches of Proto-Indo-European, contrasting Lithuanian's preserved fusional case system with Tocharian's agglutinative developments possibly sparked by language contact.",
    "tags": ["Morphology", "Historical Linguistics", "Indo-European"],
    "link": "./files/MorphTypologyBalticTocharian.pdf",
    "featured": false
  },
  {
    "id": "udmurt-lexical-development",
    "title": "Analysis of Udmurt Language Policy",
    "image": "https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&w=800&q=80",
    "imageAlt": "Map of the Uralic language regions in Russia",
    "description": "An examination of how shifting language policies in the Soviet sphere have deeply impacted the lexical development and status of the Udmurt language.",
    "tags": ["Language Policy", "Sociolinguistics", "Udmurt"],
    "link": "./files/UdmurtLexicalDev.pdf",
    "featured": false
  },
  {
    "id": "old-french-case-system",
    "title": "Loss of Two-case System in Old French",
    "image": "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80",
    "imageAlt": "Medieval French text illuminated manuscript",
    "description": "An analysis investigating the collapse of the Old French two-case morphological system.",
    "tags": ["Historical Linguistics", "Syntax", "Old French"],
    "link": "./files/OldFrenchCaseSystem.pdf",
    "featured": false
  },
  {
    "id": "post-date-text",
    "title": "The Post-date Text",
    "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    "imageAlt": "Smartphone displaying chat bubbles",
    "description": "A sociolinguistic study analyzing post-date text messages to determine common communicative elements, signs of affection, and how certain gender-specific expressions signal romantic interest.",
    "tags": ["Sociolinguistics", "Computer-Mediated Communication", "Pragmatics"],
    "link": "./files/PostDateText.pdf",
    "featured": false
  },
  {
    "id": "canadian-language-policy",
    "title": "Analysis of Canadian Language Policy",
    "image": "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=800&q=80",
    "imageAlt": "Canadian flag and educational materials",
    "description": "A critical analysis of Canada's language education policies, examining how the nation's bilingual framework simplifies its multilingual reality and perpetuates colonial biases.",
    "tags": ["Language Policy", "Education", "Sociolinguistics"],
    "link": "./files/CanadianLanguageEduPolicy.pdf",
    "featured": false
  },
  {
    "id": "rauma-jaaritus-translation",
    "title": "<em>Raumlaissi jaarituksi</em>",
    "image": "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
    "imageAlt": "Old wooden timber houses street in historical Rauma town",
    "description": "Literary translation of Frans Hjalmar Nortamo's short story 'Antonim bäev' from the collection <em>Raumlaissi jaarituksi</em>.",
    "tags": ["Translation", "Linguistics", "Rauma Dialect"],
    "link": "./files/Raumlaissi jaarituksi.pdf",
    "featured": false
  },
  {
    "id": "language-study-guide",
    "title": "Language Guide for International Volunteers",
    "image": "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    "imageAlt": "Open textbooks and study resources showing grammar notes",
    "description": "Authored a comprehensive Finnish language study guide standardizing independent learning for 70+ volunteers.",
    "tags": ["Language Teaching", "Instructional Design", "Finnish"],
    "link": "./files/FHM Language Guide v2.pdf",
    "featured": false
  },
  {
    "id": "fshs-design-study",
    "title": "FSHS Onboarding Design Study",
    "image": "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80",
    "imageAlt": "Low-fidelity and medium-fidelity UI wireframe sketches",
    "description": "A human-computer interaction study detailing multiple design iterations for an efficient online patient onboarding for the Finnish Student Health Service.",
    "tags": ["HCI", "UX Design", "Wireframing"],
    "link": "./files/FSHSDesignStudy.pdf",
    "featured": false
  },
  {
    "id": "taikatalvi",
    "title": "<em>Taikatalvi</em>",
    "image": "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=800&q=80",
    "imageAlt": "A snowy, mysterious winter forest capturing the atmosphere of Moominland Midwinter",
    "description": "A digital primer (<em>aapinen</em>) inspired by Tove Jansson's classic Moomin novel <em>Taikatalvi</em>.",
    "tags": ["Web Design", "Finnish"],
    "link": "https://taikatalvi.vercel.app/",
    "featured": false
  },
  {
    "id": "finnish-library",
    "title": "Finnish Python Library",
    "image": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
    "imageAlt": "Python programming syntax highlighting code screen",
    "description": "A Python library for Finnish morphology that conjugates verbs and declines nouns into all forms.",
    "tags": ["Python", "Morphology"],
    "link": "https://github.com/cmdaniels/fi-lib",
    "featured": false
  },
  {
    "id": "flashcard-generator",
    "title": "Anki Flashcard Generator",
    "image": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    "imageAlt": "Study notebooks and handwritten learning index cards",
    "description": "A Python script for generating structured, customizable spaced-repetition flashcards in any language.",
    "tags": ["Python", "Anki"],
    "link": "https://github.com/cmdaniels/flashcard-gen",
    "featured": false
  },
  {
    "id": "conways-game-of-life",
    "title": "Conway's Game of Life",
    "image": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    "imageAlt": "Abstract high-tech cellular pixel grid pattern",
    "description": "An interactive simulation of John Horton Conway's cellular automaton, implemented in React.",
    "tags": ["React", "Interactivity"],
    "link": "https://codepen.io/cmdaniels/full/wGYmBm/",
    "featured": false
  },
  {
    "id": "twitter-mood",
    "title": "Twitter Mood Light",
    "image": "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80",
    "imageAlt": "Digital smartphone screen showing social network status connections",
    "description": "A sentiment analysis script that analyzes Twitter API streams and updates an LED.",
    "tags": ["APIs", "Data Mining"],
    "link": "https://github.com/cmdaniels/twitter-mood",
    "featured": false
  }
];
