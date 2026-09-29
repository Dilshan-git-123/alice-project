// 100 Comprehensive Syllabus-Based College Zoology Questions (10 Categories across 5 Units)

export const DEFAULT_QUESTIONS = [
  // =========================================================================
  // UNIT I — CATEGORY 1: Taxonomy & Systematics (Questions 1 - 10)
  // =========================================================================
  {
    id: 1,
    unit: "Unit I",
    category: "taxonomy-systematics",
    questionNumber: 1,
    answer: "Systematics",
    clues: {
      A: "I am a major field within comparative biology focused on organic diversity.",
      B: "I explore both extinct and extant organisms to establish their genealogical history.",
      C: "I synthesize descriptive taxonomy with phylogenetics, biogeography, and speciation mechanics.",
      D: "G. G. Simpson formally defined me as 'the scientific study of the kinds and diversity of organisms and of any and all relationships among them'."
    },
    options: ["Taxonomy", "Systematics", "Ecology", "Morphometrics"],
    correctOption: "Systematics",
    explanation: "Systematics is the broader biological discipline encompassing taxonomy, phylogenetics, and all evolutionary relationships among organisms."
  },
  {
    id: 2,
    unit: "Unit I",
    category: "taxonomy-systematics",
    questionNumber: 2,
    answer: "Taxonomy",
    clues: {
      A: "My name is derived from two Greek words meaning 'arrangement' and 'law'.",
      B: "I establish the methodological guidelines for describing and cataloguing animal life.",
      C: "I am strictly concerned with the identification, naming, and hierarchical grouping of organisms.",
      D: "Ernst Mayr described me as 'the theory and practice of classifying organisms'."
    },
    options: ["Taxonomy", "Biosystematics", "Phylogeny", "Cladistics"],
    correctOption: "Taxonomy",
    explanation: "Taxonomy deals specifically with the theory and practice of discovering, describing, naming, and classifying organisms."
  },
  {
    id: 3,
    unit: "Unit I",
    category: "taxonomy-systematics",
    questionNumber: 3,
    answer: "Taxon",
    clues: {
      A: "I am a fundamental concept recognized at every tier of the Linnaean hierarchy.",
      B: "I represent a real, concrete biological entity rather than an abstract theoretical rank.",
      C: "Examples of me include Mammalia, Carnivora, Felidae, and Panthera leo.",
      D: "I am formally defined as a taxonomic group of any rank that is sufficiently distinct to be assigned a definite category."
    },
    options: ["Category", "Taxon", "Phenon", "Cohort"],
    correctOption: "Taxon",
    explanation: "A taxon (plural: taxa) is a concrete taxonomic group of real organisms of any rank (such as order Diptera or species Homo sapiens)."
  },
  {
    id: 4,
    unit: "Unit I",
    category: "taxonomy-systematics",
    questionNumber: 4,
    answer: "Phenon",
    clues: {
      A: "I am an operational concept frequently encountered in numerical taxonomy and phenetics.",
      B: "I group animal specimens based solely on overall phenotypic similarity regardless of evolutionary history.",
      C: "In phenograms, I am delimited by horizontal phenon lines drawn across similarity indices.",
      D: "Ernst Mayr defined me as a sample of phenotypically similar specimens or populations recognized at an empirical level."
    },
    options: ["Cladon", "Phenon", "Phylum", "Deme"],
    correctOption: "Phenon",
    explanation: "A phenon is a group of organisms sharing a given degree of phenotypic resemblance, often defined by similarity cutoff lines in phenograms."
  },
  {
    id: 5,
    unit: "Unit I",
    category: "taxonomy-systematics",
    questionNumber: 5,
    answer: "Cladon",
    clues: {
      A: "I represent a modern phylogenetic unit based on shared evolutionary ancestry.",
      B: "I am strictly monophyletic, requiring a common ancestor and all its descendents.",
      C: "I am recognized on cladograms through shared derived characters known as synapomorphies.",
      D: "In phylogenetic systematics, I am synonymous with a clade, contrasting directly with a grade or phenon."
    },
    options: ["Phenon", "Grade", "Cladon", "Morphotype"],
    correctOption: "Cladon",
    explanation: "A cladon (or clade) is a monophyletic branch of a phylogenetic tree consisting of a stem ancestor and all of its descendants."
  },
  {
    id: 6,
    unit: "Unit I",
    category: "taxonomy-systematics",
    questionNumber: 6,
    answer: "Sibling Species",
    clues: {
      A: "I pose one of the most intriguing challenges to traditional morphological taxonomy.",
      B: "My member populations live in sympatry or allopatry yet never exchange genes in nature.",
      C: "We are morphologically indistinguishable or nearly identical to human observers.",
      D: "Classic examples include Drosophila pseudoobscura and D. persimilis, or the Anopheles maculipennis mosquito complex."
    },
    options: ["Subspecies", "Sibling Species", "Demes", "Synonyms"],
    correctOption: "Sibling Species",
    explanation: "Sibling (cryptic) species are distinct, reproductively isolated species that are morphologically indistinguishable or exceedingly similar."
  },
  {
    id: 7,
    unit: "Unit I",
    category: "taxonomy-systematics",
    questionNumber: 7,
    answer: "Biological Species Concept",
    clues: {
      A: "I shifted taxonomic emphasis from typological morphology to population dynamics.",
      B: "I utilize reproductive isolation as the primary boundary criterion between distinct species.",
      C: "Formulated most prominently by evolutionary biologist Ernst Mayr in 1942.",
      D: "I define species as 'groups of actually or potentially interbreeding natural populations which are reproductively isolated from other such groups'."
    },
    options: ["Typological Species Concept", "Biological Species Concept", "Phylogenetic Species Concept", "Nominalistic Species Concept"],
    correctOption: "Biological Species Concept",
    explanation: "Ernst Mayr's Biological Species Concept defines species based on natural interbreeding populations that are reproductively isolated from others."
  },
  {
    id: 8,
    unit: "Unit I",
    category: "taxonomy-systematics",
    questionNumber: 8,
    answer: "Classification",
    clues: {
      A: "I serve as the indexing and information-retrieval storage system of natural science.",
      B: "I arrange animals into nested, hierarchical groups based on mutual affinities.",
      C: "I construct the classic tiered ranks from Domain and Kingdom down to Genus and Species.",
      D: "Simpson defined me as the ordering of animals into groups or sets on the basis of their relationships."
    },
    options: ["Identification", "Classification", "Nomenclature", "Description"],
    correctOption: "Classification",
    explanation: "Classification is the ordering of organisms into hierarchical groups or sets based on similarities, affinities, and evolutionary relationships."
  },
  {
    id: 9,
    unit: "Unit I",
    category: "taxonomy-systematics",
    questionNumber: 9,
    answer: "Identification",
    clues: {
      A: "I am a practical diagnostic procedure carried out in museums, labs, and fieldwork.",
      B: "I do not create new taxa; I match an unknown specimen to an already established classification.",
      C: "Taxonomists utilize diagnostic keys, reference collections, and atlases to perform my task.",
      D: "I am the determination of the taxonomic identity of an unknown specimen as belonging to a previously recognized taxon."
    },
    options: ["Identification", "Nomenclature", "Phylogeny", "Typification"],
    correctOption: "Identification",
    explanation: "Identification is the practical process of determining that an unknown specimen belongs to a previously established, described taxon."
  },
  {
    id: 10,
    unit: "Unit I",
    category: "taxonomy-systematics",
    questionNumber: 10,
    answer: "Evolutionary Taxonomy",
    clues: {
      A: "I am a traditional school of systematic philosophy developed by Simpson and Mayr.",
      B: "I classify organisms by considering both genealogical descent and amount of evolutionary divergence.",
      C: "Unlike cladistics, I accept paraphyletic taxa (such as Class Reptilia) when significant adaptive transitions occur.",
      D: "I combine phylogenetic branching points with morphological divergence grades to construct classifications."
    },
    options: ["Cladistics", "Phenetics", "Evolutionary Taxonomy", "Numerical Taxonomy"],
    correctOption: "Evolutionary Taxonomy",
    explanation: "Evolutionary taxonomy (Darwinian classification) considers both branching order (cladogenesis) and degree of adaptive divergence (anagenesis)."
  },

  // =========================================================================
  // UNIT I — CATEGORY 2: Nomenclature & Biosystematics (Questions 11 - 20)
  // =========================================================================
  {
    id: 11,
    unit: "Unit I",
    category: "nomenclature-biosystematics",
    questionNumber: 1,
    answer: "ICZN",
    clues: {
      A: "I provide an internationally recognized statutory framework for naming animals.",
      B: "My provisions ensure stability, universality, and uniqueness of scientific names.",
      C: "I regulate the Principle of Priority, name availability, homonymy, and type designation.",
      D: "My acronym stands for the International Code of Zoological Nomenclature."
    },
    options: ["ICBN", "ICZN", "ICTV", "IUCN"],
    correctOption: "ICZN",
    explanation: "The ICZN (International Code of Zoological Nomenclature) establishes universal rules governing the scientific naming of animals."
  },
  {
    id: 12,
    unit: "Unit I",
    category: "nomenclature-biosystematics",
    questionNumber: 2,
    answer: "Binomial Nomenclature",
    clues: {
      A: "I eliminated confusing, long polynomial descriptive phrases in early natural history.",
      B: "I was universally established for animals by Carolus Linnaeus in the 10th edition of Systema Naturae (1758).",
      C: "I mandate that every animal species name consists of exactly two Latinized words.",
      D: "The first word is the capitalized Genus name and the second is the lowercase specific epithet."
    },
    options: ["Trinomial Nomenclature", "Binomial Nomenclature", "Polynomial System", "Monophyletic System"],
    correctOption: "Binomial Nomenclature",
    explanation: "Binomial nomenclature, founded by Linnaeus, names each biological species with a capitalized genus followed by a specific epithet."
  },
  {
    id: 13,
    unit: "Unit I",
    category: "nomenclature-biosystematics",
    questionNumber: 3,
    answer: "Subspecies",
    clues: {
      A: "I am the only formal infraspecific category recognized by the ICZN.",
      B: "I represent geographically defined, allopatric populations that differ morphologically from others in the species.",
      C: "I am designated scientifically by a third Latinized word, forming a trinomen (e.g., Panthera leo persica).",
      D: "When a species contains two or more of me, it is described as a polytypic species."
    },
    options: ["Variety", "Subspecies", "Forma", "Strain"],
    correctOption: "Subspecies",
    explanation: "Subspecies is the only infraspecific rank regulated by the ICZN, designated by trinomial nomenclature to represent distinct geographic races."
  },
  {
    id: 14,
    unit: "Unit I",
    category: "nomenclature-biosystematics",
    questionNumber: 4,
    answer: "Dichotomous Key",
    clues: {
      A: "I am a diagnostic identification tool built upon progressive decision-making.",
      B: "My structure consists of a series of numbered couplets presenting contrasting character states.",
      C: "The investigator chooses between two mutually exclusive alternatives at each step until an identity is reached.",
      D: "I appear commonly in indented (yoked) format or bracketed format in taxonomic monographs."
    },
    options: ["Cladogram", "Dichotomous Key", "Phenogram", "Taxonomic Atlas"],
    correctOption: "Dichotomous Key",
    explanation: "A dichotomous key is an identification aid where users choose between pairs of contrasting character statements (couplets)."
  },
  {
    id: 15,
    unit: "Unit I",
    category: "nomenclature-biosystematics",
    questionNumber: 5,
    answer: "Numerical Taxonomy",
    clues: {
      A: "I arose in the late 1950s with the advent of high-speed electronic computers.",
      B: "Pioneered by Peter Sneath and Robert Sokal, I am often called Phenetics.",
      C: "I assign equal weight to large numbers of unweighted morphological or biochemical characters.",
      D: "I cluster operational taxonomic units (OTUs) based on overall numerical similarity matrices to produce phenograms."
    },
    options: ["Cladistics", "Numerical Taxonomy", "Cytotaxonomy", "Chemotaxonomy"],
    correctOption: "Numerical Taxonomy",
    explanation: "Numerical taxonomy (phenetics), championed by Sokal and Sneath, classifies organisms by calculating mathematical overall similarity across many unweighted traits."
  },
  {
    id: 16,
    unit: "Unit I",
    category: "nomenclature-biosystematics",
    questionNumber: 6,
    answer: "Holotype",
    clues: {
      A: "I am a primary type specimen deposited in a recognized scientific museum repository.",
      B: "I serve as the permanent, objective standard of reference for a nominal species.",
      C: "I fix the application of a specific animal name if taxonomic confusion arises in the future.",
      D: "I am the single individual specimen designated or indicated by the original author as the name-bearing type."
    },
    options: ["Paratype", "Holotype", "Syntype", "Neotype"],
    correctOption: "Holotype",
    explanation: "A holotype is the single primary physical specimen designated by the original author to anchor the scientific name of a new species."
  },
  {
    id: 17,
    unit: "Unit I",
    category: "nomenclature-biosystematics",
    questionNumber: 7,
    answer: "Biosystematics",
    clues: {
      A: "I am also known as experimental taxonomy, moving beyond dead preserved museum skins.",
      B: "I study variation and evolution in living natural populations in field and laboratory conditions.",
      C: "I incorporate chromosome cytology, reproductive compatibility, serology, and ecological genetics.",
      D: "Camp and Gilly coined my name in 1943 to denote the synthesis of taxonomy, genetics, and ecology."
    },
    options: ["Classical Taxonomy", "Biosystematics", "Alpha Taxonomy", "Typology"],
    correctOption: "Biosystematics",
    explanation: "Biosystematics (experimental taxonomy) investigates living populations using cytogenetics, ecological experiments, and molecular biology."
  },
  {
    id: 18,
    unit: "Unit I",
    category: "nomenclature-biosystematics",
    questionNumber: 8,
    answer: "Taxonomic Catalogue",
    clues: {
      A: "I am a specialized taxonomic literature reference format much more comprehensive than a simple checklist.",
      B: "I provide an exhaustive bibliographic record of all published names for a given animal group.",
      C: "I document complete synonymy, original descriptions, type localities, repository data, and distributions.",
      D: "Famous examples include Sherborn's Index Animalium and the Zoological Record."
    },
    options: ["Taxonomic Key", "Field Guide", "Taxonomic Catalogue", "Atlas"],
    correctOption: "Taxonomic Catalogue",
    explanation: "A taxonomic catalogue is a comprehensive bibliographic work listing all recognized taxa of a group along with synonymies, citations, and geographic distributions."
  },
  {
    id: 19,
    unit: "Unit I",
    category: "nomenclature-biosystematics",
    questionNumber: 9,
    answer: "Principle of Priority",
    clues: {
      A: "I am a cornerstone canon codified in Article 23 of the International Code of Zoological Nomenclature.",
      B: "I determine which of two or more competing scientific names must be officially adopted.",
      C: "I dictate that the oldest available valid name published according to ICZN rules takes precedence.",
      D: "My baseline starting date is January 1, 1758, the publication of Linnaeus's Systema Naturae 10th edition."
    },
    options: ["Principle of Priority", "Principle of Typification", "Principle of Coordination", "Law of Parsimony"],
    correctOption: "Principle of Priority",
    explanation: "The Principle of Priority mandates that the earliest validly published scientific name for a taxon is the correct name to be used."
  },
  {
    id: 20,
    unit: "Unit I",
    category: "nomenclature-biosystematics",
    questionNumber: 10,
    answer: "Neotype",
    clues: {
      A: "I am a secondary type specimen created only under strict exceptional circumstances.",
      B: "I can only be designated if the original holotype and all syntypes have been demonstrably lost or destroyed.",
      C: "I must come as close as possible to the original type locality and match original descriptions.",
      D: "My purpose is to serve as the replacement name-bearing type specimen when clarifying a confused nominal taxon."
    },
    options: ["Lectotype", "Paratype", "Neotype", "Topotype"],
    correctOption: "Neotype",
    explanation: "A neotype is a replacement type specimen designated when the original holotype and all primary type material have been lost or destroyed."
  },

  // =========================================================================
  // UNIT II — CATEGORY 3: Invertebrate Origins & Body Plans (Questions 21 - 30)
  // =========================================================================
  {
    id: 21,
    unit: "Unit II",
    category: "invertebrate-origins-bodyplans",
    questionNumber: 1,
    answer: "Colonial Flagellate Hypothesis",
    clues: {
      A: "I am the most widely accepted classical hypothesis explaining the evolutionary origin of Metazoa.",
      B: "Championed historically by Ernst Haeckel and refined by Élie Metchnikoff.",
      C: "I propose that multicellular animals arose from spherical hollow colonies of flagellated protozoans.",
      D: "Molecular phylogenetics strongly supports me by showing that Choanoflagellates are the closest living relatives of animals."
    },
    options: ["Syncytial Ciliate Hypothesis", "Colonial Flagellate Hypothesis", "Polyphyletic Theory", "Symbiotic Theory"],
    correctOption: "Colonial Flagellate Hypothesis",
    explanation: "The Colonial Flagellate Hypothesis states that metazoans originated from hollow colonies of flagellated protozoans related to modern choanoflagellates."
  },
  {
    id: 22,
    unit: "Unit II",
    category: "invertebrate-origins-bodyplans",
    questionNumber: 2,
    answer: "Bilateral Symmetry",
    clues: {
      A: "I revolutionized animal evolution by promoting directed forward locomotion.",
      B: "I am intimately linked with cephalization: concentration of sensory organs and nervous tissues at the anterior end.",
      C: "My body architecture possesses anterior, posterior, dorsal, and ventral orientations.",
      D: "My body can be divided into mirrored left and right halves along only a single sagittal plane."
    },
    options: ["Radial Symmetry", "Biradial Symmetry", "Bilateral Symmetry", "Spherical Symmetry"],
    correctOption: "Bilateral Symmetry",
    explanation: "Bilateral symmetry divides an organism into mirrored left and right halves along a single sagittal plane, driving cephalization and active directional locomotion."
  },
  {
    id: 23,
    unit: "Unit II",
    category: "invertebrate-origins-bodyplans",
    questionNumber: 3,
    answer: "Enterocoely",
    clues: {
      A: "I am a major embryological developmental pathway for forming true body cavities.",
      B: "I am a defining developmental hallmark of deuterostome coelomates like echinoderms and chordates.",
      C: "During my process, mesodermal pouches bud outward from the lateral walls of the archenteron (primitive gut).",
      D: "These outpocketing gut pouches pinch off and expand to form the peritoneal coelomic cavities."
    },
    options: ["Schizocoely", "Enterocoely", "Pseudocoely", "Acoely"],
    correctOption: "Enterocoely",
    explanation: "Enterocoely is the coelom formation process where mesodermal pouches bud directly from the archenteron walls, typical of deuterostomes."
  },
  {
    id: 24,
    unit: "Unit II",
    category: "invertebrate-origins-bodyplans",
    questionNumber: 4,
    answer: "Schizocoely",
    clues: {
      A: "I am the ancestral embryonic mode of coelom formation characteristic of protostome coelomates.",
      B: "I occur prominently during early development in annelids, arthropods, and molluscs.",
      C: "I begin with 4d micromere cells migrating into the blastocoel to form solid cordons of mesoderm.",
      D: "The true coelomic cavity forms internally when these solid mesodermal blocks split open."
    },
    options: ["Enterocoely", "Schizocoely", "Gastrulation", "Neurulation"],
    correctOption: "Schizocoely",
    explanation: "Schizocoely forms the coelom by the internal splitting of solid mesodermal blocks, characteristic of protostome invertebrates."
  },
  {
    id: 25,
    unit: "Unit II",
    category: "invertebrate-origins-bodyplans",
    questionNumber: 5,
    answer: "Pseudocoelom",
    clues: {
      A: "I am a fluid-filled body space found in rotifers, nematodes, and gastrotrichs.",
      B: "I act as an efficient hydrostatic skeleton for internal organ suspension and locomotion.",
      C: "Embryologically, I represent the persistent embryonic blastocoel rather than a new cavity.",
      D: "I am distinguished because I lack a complete cellular mesodermal peritoneum lining my internal walls."
    },
    options: ["Eucoelom", "Pseudocoelom", "Haemocoel", "Archenteron"],
    correctOption: "Pseudocoelom",
    explanation: "A pseudocoelom is a 'false' body cavity derived from the embryonic blastocoel that is not lined by a mesodermal peritoneal epithelium."
  },
  {
    id: 26,
    unit: "Unit II",
    category: "invertebrate-origins-bodyplans",
    questionNumber: 6,
    answer: "Metamerism",
    clues: {
      A: "I am a fundamental body plan feature present in Annelida, Arthropoda, and Chordata.",
      B: "I provide mechanical efficiency, regional specialization, and localized hydraulic locomotion.",
      C: "I am characterized by the linear serial repetition of homologous body organs along the anteroposterior axis.",
      D: "In zoology, I am commonly known as true segmentation."
    },
    options: ["Cephalization", "Metamerism", "Tagmosis", "Polymorphism"],
    correctOption: "Metamerism",
    explanation: "Metamerism (true segmentation) is the serial repetition of homologous body parts and organ systems along the longitudinal axis of an animal."
  },
  {
    id: 27,
    unit: "Unit II",
    category: "invertebrate-origins-bodyplans",
    questionNumber: 7,
    answer: "Cyclomerism Theory",
    clues: {
      A: "I am an evolutionary hypothesis formulated by Sedgwick (1884) to explain the origin of metameric segmentation.",
      B: "I trace the origin of segmentation back to ancestral anthozoan cnidarians.",
      C: "I suggest segments arose when radial gastric pouches were serially duplicated along an elongated body.",
      D: "I propose that the coelom and segments arose simultaneously from partitioned enterocoelic gut compartments."
    },
    options: ["Corm Theory", "Pseudometamerism Theory", "Cyclomerism Theory", "Locomotion Theory"],
    correctOption: "Cyclomerism Theory",
    explanation: "Sedgwick's Cyclomerism Theory proposes that metamerism and coelomic cavities evolved from the subdivision of gastric pouches in an ancestral anthozoan."
  },
  {
    id: 28,
    unit: "Unit II",
    category: "invertebrate-origins-bodyplans",
    questionNumber: 8,
    answer: "Protostomes",
    clues: {
      A: "I am a major lineage of Bilateria comprising Platyhelminthes, Annelida, Mollusca, and Arthropoda.",
      B: "My early embryonic cleavage is predominantly spiral and determinate.",
      C: "During my gastrulation, the initial embryonic blastopore develops directly into the adult mouth.",
      D: "My name literally translates from Greek as 'mouth first'."
    },
    options: ["Deuterostomes", "Protostomes", "Radiata", "Parazoa"],
    correctOption: "Protostomes",
    explanation: "Protostomes ('mouth first') are bilaterian animals where the embryonic blastopore becomes the mouth, typically exhibiting spiral determinate cleavage."
  },
  {
    id: 29,
    unit: "Unit II",
    category: "invertebrate-origins-bodyplans",
    questionNumber: 9,
    answer: "Deuterostomes",
    clues: {
      A: "I am the sister clade to Protostomia within the Bilateria.",
      B: "My early embryos undergo radial and indeterminate (regulative) cleavage.",
      C: "During my gastrulation, the blastopore develops into the anus, while the mouth forms secondarily.",
      D: "My living representatives include Echinodermata, Hemichordata, and Chordata."
    },
    options: ["Ecdysozoa", "Lophotrochozoa", "Deuterostomes", "Protostomes"],
    correctOption: "Deuterostomes",
    explanation: "Deuterostomes ('mouth second') develop their anus from or near the blastopore, with the mouth arising secondarily, showing radial indeterminate cleavage."
  },
  {
    id: 30,
    unit: "Unit II",
    category: "invertebrate-origins-bodyplans",
    questionNumber: 10,
    answer: "Phylogenetic Tree",
    clues: {
      A: "I am a visual graphical hypothesis of genealogical history and macroevolutionary patterns.",
      B: "My internal nodes represent inferred speciation events and common ancestors.",
      C: "My terminal branches indicate extant or extinct evolutionary lineages.",
      D: "Charles Darwin famously drew a sketch of me in his notebook with the caption 'I think'."
    },
    options: ["Phenogram", "Phylogenetic Tree", "Histogram", "Stratigraphic Column"],
    correctOption: "Phylogenetic Tree",
    explanation: "A phylogenetic tree is a branching diagrammatic hypothesis showing inferred evolutionary relationships and common ancestry among biological taxa."
  },

  // =========================================================================
  // UNIT II — CATEGORY 4: Arthropod, Molluscan & Echinoderm Phylogeny (Questions 31 - 40)
  // =========================================================================
  {
    id: 31,
    unit: "Unit II",
    category: "arthropod-mollusca-echinoderm",
    questionNumber: 1,
    answer: "Trochophore Larva",
    clues: {
      A: "I am a microscopic, free-swimming ciliated pelagic larva.",
      B: "My diamond or top-shaped body features an equatorial girdle of cilia called the prototroch.",
      C: "I have an apical sensory organ and complete digestive system with blastopore-derived mouth.",
      D: "My shared presence provides classic morphological proof uniting Mollusca and Annelida in Lophotrochozoa."
    },
    options: ["Nauplius Larva", "Trochophore Larva", "Planula Larva", "Tornaria Larva"],
    correctOption: "Trochophore Larva",
    explanation: "The trochophore larva is a ciliated, free-swimming planktonic larval stage that phylogenetically links molluscs and annelids."
  },
  {
    id: 32,
    unit: "Unit II",
    category: "arthropod-mollusca-echinoderm",
    questionNumber: 2,
    answer: "Bipinnaria Larva",
    clues: {
      A: "I am an early larval stage exclusive to the phylum Echinodermata.",
      B: "Unlike my adult form, my body exhibits complete bilateral symmetry.",
      C: "I possess a continuous, winding ciliated band running over lateral lobes used for swimming and feeding.",
      D: "I am the characteristic free-swimming early larva of sea stars (Asteroidea), followed by the brachiolaria stage."
    },
    options: ["Bipinnaria Larva", "Pluteus Larva", "Auricularia Larva", "Veliger Larva"],
    correctOption: "Bipinnaria Larva",
    explanation: "The bipinnaria is the bilateral, ciliated early larval stage of Asteroidea (sea stars) that subsequently develops into a brachiolaria larva."
  },
  {
    id: 33,
    unit: "Unit II",
    category: "arthropod-mollusca-echinoderm",
    questionNumber: 3,
    answer: "Pluteus Larva",
    clues: {
      A: "I am an echinoderm larva with an easel-like or pyramidal appearance.",
      B: "My body is supported internally by delicate, calcified skeletal rods.",
      C: "I bear elongated, ciliated projecting arms used for suspension feeding.",
      D: "I occur in two distinct types: the echinopluteus of sea urchins and the ophiopluteus of brittle stars."
    },
    options: ["Mysis Larva", "Zoea Larva", "Pluteus Larva", "Glochidium Larva"],
    correctOption: "Pluteus Larva",
    explanation: "The pluteus larva possesses long projecting arms supported by calcareous rods, characteristic of Echinoidea and Ophiuroidea."
  },
  {
    id: 34,
    unit: "Unit II",
    category: "arthropod-mollusca-echinoderm",
    questionNumber: 4,
    answer: "Dipleurula",
    clues: {
      A: "I am a prominent theoretical concept in echinoderm and deuterostome phylogeny.",
      B: "Conceived by Bather in 1900 as the hypothetical bilateral ancestor of all echinoderms.",
      C: "My hypothetical body had bilateral symmetry, three pairs of coelomic pouches, and a circumoral ciliated band.",
      D: "All modern echinoderm larval types (bipinnaria, auricularia, pluteus) are derived phylogenetically from me."
    },
    options: ["Trochophore", "Dipleurula", "Gastrea", "Planula"],
    correctOption: "Dipleurula",
    explanation: "The Dipleurula is the hypothetical, bilateral ancestor reconstructed to explain the common origin and diverse larval forms of all echinoderms."
  },
  {
    id: 35,
    unit: "Unit II",
    category: "arthropod-mollusca-echinoderm",
    questionNumber: 5,
    answer: "Radula",
    clues: {
      A: "I am an anatomical feeding synapomorphy unique to the phylum Mollusca.",
      B: "I am supported by a cartilaginous base called an odontophore within the buccal cavity.",
      C: "I consist of a flexible chitinous ribbon carrying transverse rows of microscopic recurved teeth.",
      D: "I am present in snails, slugs, chitons, and cephalopods, but completely lost in bivalves."
    },
    options: ["Radula", "Aristotle's Lantern", "Mandible", "Chelicera"],
    correctOption: "Radula",
    explanation: "The radula is a minutely toothed, chitinous ribbon found in almost all molluscan classes (except Bivalvia) used for scraping and grazing food."
  },
  {
    id: 36,
    unit: "Unit II",
    category: "arthropod-mollusca-echinoderm",
    questionNumber: 6,
    answer: "Torsion",
    clues: {
      A: "I am a dramatic morphogenetic event occurring during the larval development of Gastropoda.",
      B: "I am strictly distinct from the spiral coiling of the shell.",
      C: "I involve an asymmetrical 180-degree counterclockwise rotation of the visceral mass and mantle cavity.",
      D: "As a result of my rotation, the anus, gills, and mantle cavity are repositioned directly above the head."
    },
    options: ["Evisceration", "Torsion", "Tagmosis", "Ecdysis"],
    correctOption: "Torsion",
    explanation: "Torsion is the 180° counterclockwise rotation of the visceral mass during gastropod veliger larval development, bringing the mantle cavity to the anterior."
  },
  {
    id: 37,
    unit: "Unit II",
    category: "arthropod-mollusca-echinoderm",
    questionNumber: 7,
    answer: "Ecdysis",
    clues: {
      A: "I am a major physiological milestone in the life history of all arthropods.",
      B: "Controlled by the steroid hormone ecdysone secreted under neuroendocrine regulation.",
      C: "I am necessary because an inextensible cuticular exoskeleton restricts physical somatic growth.",
      D: "I am commonly called moulting, and unite arthropods and nematodes inside the superphylum Ecdysozoa."
    },
    options: ["Metamorphosis", "Ecdysis", "Autotomy", "Epimorphosis"],
    correctOption: "Ecdysis",
    explanation: "Ecdysis (moulting) is the periodic shedding of the cuticular exoskeleton, defining the monophyletic superphylum Ecdysozoa."
  },
  {
    id: 38,
    unit: "Unit II",
    category: "arthropod-mollusca-echinoderm",
    questionNumber: 8,
    answer: "Tagmosis",
    clues: {
      A: "I am a key evolutionary hallmark responsible for the spectacular adaptive radiation of Arthropoda.",
      B: "I modify primitive homonomous metameric segments into specialized functional regions.",
      C: "Through fusion and structural differentiation, I produce tagmata such as head, thorax, and abdomen.",
      D: "In chelicerates and decapod crustaceans, I produce a unified cephalothorax (prosoma)."
    },
    options: ["Metamerism", "Tagmosis", "Polymorphism", "Strobilation"],
    correctOption: "Tagmosis",
    explanation: "Tagmosis is the evolutionary fusion and functional specialization of adjacent body segments into distinct tagmata (head, thorax, abdomen)."
  },
  {
    id: 39,
    unit: "Unit II",
    category: "arthropod-mollusca-echinoderm",
    questionNumber: 9,
    answer: "Water Vascular System",
    clues: {
      A: "I am an organ system without counterpart in any other animal phylum on Earth.",
      B: "Embryologically, I develop directly from coelomic compartments (the hydrocoel).",
      C: "I operate through hydrostatic fluid pressure regulated by a sieve-like madreporite and stone canal.",
      D: "I branch into radial canals and thousands of muscular tube feet (podia) for locomotion, food handling, and gas exchange."
    },
    options: ["Haemal System", "Water Vascular System", "Protonephridial System", "Tracheal System"],
    correctOption: "Water Vascular System",
    explanation: "The water vascular (ambulacral) system is a coelom-derived hydraulic network unique to echinoderms, operating tube feet for locomotion and respiration."
  },
  {
    id: 40,
    unit: "Unit II",
    category: "arthropod-mollusca-echinoderm",
    questionNumber: 10,
    answer: "Veliger Larva",
    clues: {
      A: "I am a specialized planktonic larva characteristic of marine gastropods and bivalves.",
      B: "I develop ontogenetically from an earlier trochophore stage.",
      C: "I possess a rudimentary coiled shell, foot, and operculum.",
      D: "My most conspicuous feature is a pair of large, ciliated swimming lobes called the velum."
    },
    options: ["Veliger Larva", "Glochidium Larva", "Zoea Larva", "Megalopa Larva"],
    correctOption: "Veliger Larva",
    explanation: "The veliger is the characteristic larval stage of marine gastropods and bivalves, distinguished by ciliated velar lobes used for swimming and feeding."
  },

  // =========================================================================
  // UNIT III — CATEGORY 5: Chordate Origins & Fish Evolution (Questions 41 - 50)
  // =========================================================================
  {
    id: 41,
    unit: "Unit III",
    category: "chordate-origins-fish-evolution",
    questionNumber: 1,
    answer: "Garstang's Hypothesis",
    clues: {
      A: "I am an influential 20th-century evolutionary theory proposed by Walter Garstang in 1928.",
      B: "I reject an annelid or arthropod ancestry for chordates, focusing instead on deuterostome larvae.",
      C: "I suggest chordates arose when ciliated echinoderm larvae failed to metamorphose and became sexually mature.",
      D: "I invoke the macroevolutionary process of paedomorphosis (neoteny) from an auricularia-like ancestor."
    },
    options: ["Gaskell's Annelid Theory", "Garstang's Hypothesis", "Balfour's Coelom Theory", "Geoffroy's Inversion Theory"],
    correctOption: "Garstang's Hypothesis",
    explanation: "Garstang's hypothesis suggests that the ancestral chordate body plan evolved via paedomorphosis (neoteny) from bilateral, ciliated echinoderm larvae."
  },
  {
    id: 42,
    unit: "Unit III",
    category: "chordate-origins-fish-evolution",
    questionNumber: 2,
    answer: "Ostracoderms",
    clues: {
      A: "We are an extinct paraphyletic assemblage of primitive fish-like vertebrates.",
      B: "We flourished in freshwater and marine environments of the Ordovician, Silurian, and Devonian periods.",
      C: "We completely lacked true jaws and pelvic fins, moving via a heterocercal tail.",
      D: "Our heads and bodies were encased in heavy, bony dermal armor plates, giving us the moniker 'shell-skinned'."
    },
    options: ["Placoderms", "Ostracoderms", "Acanthodians", "Teleosts"],
    correctOption: "Ostracoderms",
    explanation: "Ostracoderms ('shell-skinned') are the earliest known jawless armored fossil vertebrates (agnathans), flourishing from the Ordovician to Devonian."
  },
  {
    id: 43,
    unit: "Unit III",
    category: "chordate-origins-fish-evolution",
    questionNumber: 3,
    answer: "Placoderms",
    clues: {
      A: "We represent a monumental breakthrough in vertebrate predatory evolution.",
      B: "We were the first vertebrates to possess true movable biting jaws derived from mandibular arches.",
      C: "Our head and thoracic regions were covered in heavy dermal bony shields with a distinctive neck hinge.",
      D: "Giant apex Devonian predators like the 9-meter Dunkleosteus belong to our extinct class."
    },
    options: ["Ostracoderms", "Placoderms", "Chondrichthyes", "Cyclostomes"],
    correctOption: "Placoderms",
    explanation: "Placoderms ('plate-skinned') were the earliest gnathostome (jawed) fishes, featuring heavy dermal armor plates and movable jaws, exemplified by Dunkleosteus."
  },
  {
    id: 44,
    unit: "Unit III",
    category: "chordate-origins-fish-evolution",
    questionNumber: 4,
    answer: "Acanthodii",
    clues: {
      A: "We are an extinct group of early jawed fishes often referred to as 'spiny sharks'.",
      B: "We appeared in the Silurian and died out in the Permian.",
      C: "We had small diamond-shaped scales, large eyes, and multiple pairs of intermediate ventrolateral fins.",
      D: "Our defining diagnostic trait was a series of stout, prominent bony spines supporting every fin except the caudal."
    },
    options: ["Placoderms", "Acanthodii", "Osteostraci", "Anaspida"],
    correctOption: "Acanthodii",
    explanation: "Acanthodians ('spiny sharks') were early Paleozoic gnathostomes characterized by stout bony spines supporting all fins and multiple intermediate paired fins."
  },
  {
    id: 45,
    unit: "Unit III",
    category: "chordate-origins-fish-evolution",
    questionNumber: 5,
    answer: "Notochord",
    clues: {
      A: "I am the defining primary endoskeletal structure that gives Phylum Chordata its scientific name.",
      B: "I originate embryologically from the chordamesoderm beneath the dorsal nerve cord.",
      C: "I consist of a flexible, turgid rod of fluid-filled vacuolated cells enclosed in a fibrous sheath.",
      D: "In adult vertebrates, I am largely or entirely replaced by the cartilaginous or bony vertebral column."
    },
    options: ["Spinal Cord", "Notochord", "Endostyle", "Vertebral Arch"],
    correctOption: "Notochord",
    explanation: "The notochord is a flexible, dorsal rod of vacuolated cells serving as the primary axial skeletal support in all chordate embryos."
  },
  {
    id: 46,
    unit: "Unit III",
    category: "chordate-origins-fish-evolution",
    questionNumber: 6,
    answer: "Branchiostoma",
    clues: {
      A: "I am a classic model organism in vertebrate evolutionary embryology.",
      B: "I am a translucent, fish-like marine burrower belonging to Subphylum Cephalochordata.",
      C: "Also commonly known by my historical genus name, Amphioxus (the lancelet).",
      D: "I retain all five primary chordate hallmarks (notochord, nerve cord, pharyngeal slits, endostyle, post-anal tail) in full adulthood."
    },
    options: ["Branchiostoma", "Petromyzon", "Balanoglossus", "Ascidia"],
    correctOption: "Branchiostoma",
    explanation: "Branchiostoma (Amphioxus / lancelet) is a cephalochordate that retains the notochord, dorsal hollow nerve cord, pharyngeal slits, and endostyle throughout life."
  },
  {
    id: 47,
    unit: "Unit III",
    category: "chordate-origins-fish-evolution",
    questionNumber: 7,
    answer: "Tornaria Larva",
    clues: {
      A: "I am a planktonic marine larva belonging to the enteropneust hemichordates (acorn worms).",
      B: "Johannes Müller discovered me in 1850 and initially misclassified me as an echinoderm larva.",
      C: "My transparent oval body features a complex loop of ciliated bands and an apical sensory tuft.",
      D: "My striking morphological resemblance to the echinoderm bipinnaria larva provides key evidence of chordate-echinoderm affinities."
    },
    options: ["Müller's Larva", "Tornaria Larva", "Actinotrocha Larva", "Pilidium Larva"],
    correctOption: "Tornaria Larva",
    explanation: "The tornaria larva of enteropneust hemichordates closely resembles echinoderm bipinnaria larvae, demonstrating deuterostome interrelationships."
  },
  {
    id: 48,
    unit: "Unit III",
    category: "chordate-origins-fish-evolution",
    questionNumber: 8,
    answer: "Sarcopterygii",
    clues: {
      A: "We are a major osteichthyan class commonly known as the lobe-finned fishes.",
      B: "Unlike ray-finned fishes, our paired fins are borne on fleshy, muscular lobes with an internal skeletal axis.",
      C: "Our living members include the coelacanth (Latimeria) and three genera of lungfishes (Dipnoi).",
      D: "The internal bones of our pectoral fins (humerus, radius, ulna) are homologous to the tetrapod forelimb."
    },
    options: ["Actinopterygii", "Sarcopterygii", "Chondrichthyes", "Acanthodii"],
    correctOption: "Sarcopterygii",
    explanation: "Sarcopterygii (lobe-finned fishes) possess fleshy paired fins supported by internal bony elements that gave rise to terrestrial tetrapod limbs."
  },
  {
    id: 49,
    unit: "Unit III",
    category: "chordate-origins-fish-evolution",
    questionNumber: 9,
    answer: "Tiktaalik",
    clues: {
      A: "I am an iconic transitional fossil discovered in 2004 on Ellesmere Island in Arctic Canada.",
      B: "I lived during the Late Devonian period, approximately 375 million years ago.",
      C: "I possess fish traits (scales, fin rays, gills) alongside tetrapod traits (neck, ribs, flat skull, wrist bones).",
      D: "Popularly celebrated as the premier 'fishapod' bridging the evolutionary gap between lobe-finned fish and early tetrapods."
    },
    options: ["Archaeopteryx", "Tiktaalik", "Eusthenopteron", "Ichthyostega"],
    correctOption: "Tiktaalik",
    explanation: "Tiktaalik roseae is a Late Devonian 'fishapod' displaying intermediate morphology between sarcopterygian fishes (Panderichthys) and stem tetrapods (Acanthostega)."
  },
  {
    id: 50,
    unit: "Unit III",
    category: "chordate-origins-fish-evolution",
    questionNumber: 10,
    answer: "Endostyle",
    clues: {
      A: "I am one of the fundamental diagnostic anatomical hallmarks of the Phylum Chordata.",
      B: "I am situated along the ventral floor of the pharynx in tunicates, cephalochordates, and larval lampreys.",
      C: "I secrete a continuous ribbon of mucus used to trap suspended food particles drawn through the gill slits.",
      D: "My iodinated protein-binding cells are directly homologous to the thyroid gland of adult vertebrates."
    },
    options: ["Epithalamus", "Endostyle", "Hatschek's Pit", "Glomus"],
    correctOption: "Endostyle",
    explanation: "The endostyle is a ventral ciliated groove in the pharynx of prochordates and ammocoete larvae that concentrates iodine and evolved into the vertebrate thyroid gland."
  },

  // =========================================================================
  // UNIT III — CATEGORY 6: Tetrapod & Vertebrate Evolution (Questions 51 - 60)
  // =========================================================================
  {
    id: 51,
    unit: "Unit III",
    category: "tetrapod-vertebrate-evolution",
    questionNumber: 1,
    answer: "Acanthostega",
    clues: {
      A: "I am one of the most famous stem tetrapods of the Late Devonian period from Greenland.",
      B: "I proved that limbs with digits originally evolved for underwater crawling before animals conquered dry land.",
      C: "I retained internal fish-like gills, a caudal fin, and lateral line canals.",
      D: "My paddle-like limbs famously bore eight digits on each foot rather than the modern pentadactyl count."
    },
    options: ["Acanthostega", "Seymouria", "Dimetrodon", "Hylonomus"],
    correctOption: "Acanthostega",
    explanation: "Acanthostega is a Late Devonian stem tetrapod with eight digits per limb, retaining internal gills and illustrating that limbs evolved in aquatic habitats."
  },
  {
    id: 52,
    unit: "Unit III",
    category: "tetrapod-vertebrate-evolution",
    questionNumber: 2,
    answer: "Amniotic Egg",
    clues: {
      A: "I am the definitive evolutionary breakthrough that emancipated vertebrates from dependence on water for breeding.",
      B: "My external porous shell protects against desiccation while allowing gas exchange.",
      C: "I contain four specialized extraembryonic membranes: yolk sac, amnion, chorion, and allantois.",
      D: "My advent during the Carboniferous period gave rise to the clade Amniota (reptiles, birds, mammals)."
    },
    options: ["Cleidoic Shell", "Amniotic Egg", "Placental Sac", "Blastocyst"],
    correctOption: "Amniotic Egg",
    explanation: "The amniotic egg, equipped with amnion, chorion, allantois, and yolk sac, allowed terrestrial reproduction without returning to aquatic environments."
  },
  {
    id: 53,
    unit: "Unit III",
    category: "tetrapod-vertebrate-evolution",
    questionNumber: 3,
    answer: "Synapsida",
    clues: {
      A: "We are a primary lineage of amniotes that diverged during the Pennsylvanian subperiod.",
      B: "Our skull architecture is characterized by a single lower temporal opening behind each eye orbit.",
      C: "Our early members included sail-backed pelycosaurs like Dimetrodon, followed by advanced therapsids.",
      D: "We gave rise directly to the true mammals, making our lineage the mammalian ancestral stem."
    },
    options: ["Diapsida", "Anapsida", "Synapsida", "Euryapsida"],
    correctOption: "Synapsida",
    explanation: "Synapsida is the amniote lineage possessing a single temporal fenestra, encompassing pelycosaurs, therapsids, and modern mammals."
  },
  {
    id: 54,
    unit: "Unit III",
    category: "tetrapod-vertebrate-evolution",
    questionNumber: 4,
    answer: "Diapsida",
    clues: {
      A: "We are the extraordinarily diverse amniote lineage characterized by two temporal fenestrae in the skull.",
      B: "Our skull features both a superior and an inferior temporal opening separated by a postorbital-squamosal bar.",
      C: "Our major divisions include Lepidosauromorpha (lizards, snakes, tuatara) and Archosauromorpha.",
      D: "Our archosaur branch gave rise to crocodilians, pterosaurs, dinosaurs, and modern birds."
    },
    options: ["Synapsida", "Diapsida", "Anapsida", "Parareptilia"],
    correctOption: "Diapsida",
    explanation: "Diapsida is the reptilian clade characterized by two temporal openings in the skull, including lizards, snakes, crocodilians, dinosaurs, and birds."
  },
  {
    id: 55,
    unit: "Unit III",
    category: "tetrapod-vertebrate-evolution",
    questionNumber: 5,
    answer: "Therapsida",
    clues: {
      A: "We are the advanced synapsid order that dominated terrestrial ecosystems in the Permian and Triassic.",
      B: "Our limbs rotated beneath the body into an erect, upright posture instead of a sprawling gait.",
      C: "We evolved heterodont dentition (incisors, canines, molars) and a secondary bony palate.",
      D: "Our cynodont subgroup developed endothermy, hair, and ultimately gave origin to the first true mammals."
    },
    options: ["Pelycosauria", "Therapsida", "Cotylosauria", "Plesiosauria"],
    correctOption: "Therapsida",
    explanation: "Therapsida ('beast-face') were advanced mammal-like synapsids with upright posture, heterodont teeth, and secondary palate, leading to cynodonts and mammals."
  },
  {
    id: 56,
    unit: "Unit III",
    category: "tetrapod-vertebrate-evolution",
    questionNumber: 6,
    answer: "Prototheria",
    clues: {
      A: "I am the most basal of the three mammalian subclasses recognized in mammalian systematics.",
      B: "My living representatives are confined entirely to the Australasian biogeographic realm.",
      C: "We lack nipples, secreting milk onto abdominal skin patches, and possess a cloaca.",
      D: "We are the oviparous (egg-laying) mammals comprising the Order Monotremata (platypus and echidnas)."
    },
    options: ["Metatheria", "Eutheria", "Prototheria", "Allotheria"],
    correctOption: "Prototheria",
    explanation: "Subclass Prototheria (monotremes) contains the egg-laying mammals (platypus and echidnas) possessing a cloaca and lacking nipples."
  },
  {
    id: 57,
    unit: "Unit III",
    category: "tetrapod-vertebrate-evolution",
    questionNumber: 7,
    answer: "Metatheria",
    clues: {
      A: "We are one of the three mammalian subclasses, also known as the marsupials.",
      B: "We have an epipubic bone and a bifurcated reproductive tract with short intrauterine gestation.",
      C: "Our altricial young are born in an embryonic state and crawl unaided into a maternal pouch.",
      D: "We diversified extensively in Australia and South America, exemplified by kangaroos, koalas, and opossums."
    },
    options: ["Prototheria", "Metatheria", "Eutheria", "Monotremata"],
    correctOption: "Metatheria",
    explanation: "Subclass Metatheria (marsupials) gives birth to tiny altricial young that complete development nursing inside an external abdominal pouch (marsupium)."
  },
  {
    id: 58,
    unit: "Unit III",
    category: "tetrapod-vertebrate-evolution",
    questionNumber: 8,
    answer: "Eutheria",
    clues: {
      A: "We are the most diverse and widespread subclass of mammals, comprising over 90% of living mammalian species.",
      B: "We lack epipubic bones, allowing expansion of the abdomen during prolonged internal pregnancy.",
      C: "Our embryos are nourished in utero via a highly vascular chorioallantoic placenta.",
      D: "We give birth to anatomically advanced young, spanning rodents, bats, cetaceans, ungulates, and primates."
    },
    options: ["Metatheria", "Prototheria", "Eutheria", "Multituberculata"],
    correctOption: "Eutheria",
    explanation: "Subclass Eutheria (placental mammals) is characterized by prolonged gestation facilitated by a complex chorioallantoic placenta."
  },
  {
    id: 59,
    unit: "Unit III",
    category: "tetrapod-vertebrate-evolution",
    questionNumber: 9,
    answer: "Archaeopteryx",
    clues: {
      A: "I was discovered in 1861 in the Solnhofen limestone of Bavaria, Germany.",
      B: "I lived during the Late Jurassic period, approximately 150 million years ago.",
      C: "I possess reptilian features: jaw with teeth, three clawed wing fingers, and a long bony tail.",
      D: "I possess avian features: asymmetric flight feathers, wishbone (furcula), and wings, proving birds evolved from theropod dinosaurs."
    },
    options: ["Hesperornis", "Ichthyornis", "Archaeopteryx", "Confuciusornis"],
    correctOption: "Archaeopteryx",
    explanation: "Archaeopteryx is the iconic Late Jurassic transitional fossil linking coelurosaurian theropod dinosaurs to modern avians."
  },
  {
    id: 60,
    unit: "Unit III",
    category: "tetrapod-vertebrate-evolution",
    questionNumber: 10,
    answer: "Labyrinthodontia",
    clues: {
      A: "We are an extinct subclass of primitive Paleozoic amphibians that flourished in Carboniferous swamps.",
      B: "We were the dominant predators of early freshwater and terrestrial landscapes.",
      C: "Our skull roofs were heavily armored with solid dermal bones like ancestral rhipidistian fishes.",
      D: "Our name is derived from the complex, intricately folded labyrinthine enamel pattern of our conical teeth."
    },
    options: ["Labyrinthodontia", "Lissamphibia", "Anura", "Gymnophiona"],
    correctOption: "Labyrinthodontia",
    explanation: "Labyrinthodonts were primitive Paleozoic amphibians named for the complex internal folding (labyrinth) of their tooth enamel, ancestral to all land vertebrates."
  },

  // =========================================================================
  // UNIT IV — CATEGORY 7: Geological Time Concepts (Questions 61 - 70)
  // =========================================================================
  {
    id: 61,
    unit: "Unit IV",
    category: "geological-time-concepts",
    questionNumber: 1,
    answer: "Eon",
    clues: {
      A: "I represent the highest, broadest tier in the formal geochronologic hierarchy.",
      B: "Earth's 4.54-billion-year history is divided into only four of me.",
      C: "The Hadean, Archean, Proterozoic, and Phanerozoic are my four member divisions.",
      D: "I am composed of multiple eras and span hundreds of millions to billions of years."
    },
    options: ["Era", "Period", "Eon", "Epoch"],
    correctOption: "Eon",
    explanation: "An Eon is the largest formal geochronological unit of geological time (e.g., the Phanerozoic Eon)."
  },
  {
    id: 62,
    unit: "Unit IV",
    category: "geological-time-concepts",
    questionNumber: 2,
    answer: "Era",
    clues: {
      A: "I am the second-largest major subdivision of geological time, ranking directly beneath an Eon.",
      B: "My boundaries are typically demarcated by profound global mass extinctions and biotic turnover.",
      C: "The Phanerozoic Eon is partitioned into three of me: Paleozoic ('ancient life'), Mesozoic ('middle life'), and Cenozoic ('recent life').",
      D: "I am formally subdivided into several geological Periods."
    },
    options: ["Epoch", "Age", "Era", "Chrone"],
    correctOption: "Era",
    explanation: "An Era is a major division of geological time subordinated to an Eon and divided into Periods (e.g., Paleozoic, Mesozoic, Cenozoic)."
  },
  {
    id: 63,
    unit: "Unit IV",
    category: "geological-time-concepts",
    questionNumber: 3,
    answer: "Period",
    clues: {
      A: "I am the fundamental and most commonly cited standard unit of the geological timescale.",
      B: "My chronostratigraphic equivalent in rock layers is termed a 'System'.",
      C: "Examples of me include Cambrian, Devonian, Carboniferous, Jurassic, and Cretaceous.",
      D: "I rank between an Era and an Epoch in the geological time hierarchy."
    },
    options: ["Epoch", "Period", "Eon", "Stage"],
    correctOption: "Period",
    explanation: "A geological Period is the fundamental standard unit of geological time, subdivisions of eras and composed of epochs."
  },
  {
    id: 64,
    unit: "Unit IV",
    category: "geological-time-concepts",
    questionNumber: 4,
    answer: "Epoch",
    clues: {
      A: "I rank directly below a Period and above an Age in geochronology.",
      B: "My chronostratigraphic rock equivalent is designated as a 'Series'.",
      C: "The Cenozoic periods (Paleogene, Neogene, Quaternary) are traditionally divided into seven of me.",
      D: "Famous examples include the Paleocene, Eocene, Miocene, Pleistocene, and Holocene."
    },
    options: ["Era", "Age", "Epoch", "Eon"],
    correctOption: "Epoch",
    explanation: "An Epoch is a subdivision of a geological period (e.g., Pleistocene Epoch of the Quaternary Period)."
  },
  {
    id: 65,
    unit: "Unit IV",
    category: "geological-time-concepts",
    questionNumber: 5,
    answer: "Age",
    clues: {
      A: "I am the shortest, finest standard formal geochronologic time interval in the geological timescale.",
      B: "My chronostratigraphic rock layer equivalent is termed a 'Stage'.",
      C: "I typically span intervals of a few hundred thousand to a few million years.",
      D: "I represent a subdivision of an Epoch, defined by precise fossil biozones (e.g., Maastrichtian Age)."
    },
    options: ["Period", "Era", "Age", "Zone"],
    correctOption: "Age",
    explanation: "An Age is the smallest formal geochronologic interval, a subdivision of an epoch corresponding to a stratigraphic stage."
  },
  {
    id: 66,
    unit: "Unit IV",
    category: "geological-time-concepts",
    questionNumber: 6,
    answer: "Index Fossil",
    clues: {
      A: "I am an indispensable tool used by geologists and paleontologists for biostratigraphy.",
      B: "I allow geologists to correlate and date rock strata across continents.",
      C: "I must belong to an organism that was geographically widespread, easily identifiable, and abundant.",
      D: "My most critical feature is that my species existed for only a very narrow, short geological time span."
    },
    options: ["Trace Fossil", "Index Fossil", "Living Fossil", "Coprolite"],
    correctOption: "Index Fossil",
    explanation: "An index fossil is a fossil from a widely distributed, easily recognized organism that existed for a short, well-defined geological duration, ideal for dating strata."
  },
  {
    id: 67,
    unit: "Unit IV",
    category: "geological-time-concepts",
    questionNumber: 7,
    answer: "Stratigraphy",
    clues: {
      A: "I am the foundational geological discipline that reads the book of Earth history recorded in stone.",
      B: "Formulated originally by Nicolaus Steno with principles like original horizontality and lateral continuity.",
      C: "I rely centrally on the Law of Superposition: in undisturbed sedimentary rocks, older layers lie beneath younger layers.",
      D: "I study the description, composition, fossil content, and relative ages of layered rock strata."
    },
    options: ["Petrology", "Stratigraphy", "Mineralogy", "Geomorphology"],
    correctOption: "Stratigraphy",
    explanation: "Stratigraphy is the branch of geology concerned with the order, relative age, and correlation of rock strata according to the Law of Superposition."
  },
  {
    id: 68,
    unit: "Unit IV",
    category: "geological-time-concepts",
    questionNumber: 8,
    answer: "Radiometric Dating",
    clues: {
      A: "I revolutionized 20th-century geology by providing absolute numerical calendar ages in millions of years.",
      B: "I do not rely on relative fossil comparisons, but on nuclear physics inside igneous and metamorphic minerals.",
      C: "I measure the constant, unalterable half-life decay of unstable radioactive parent isotopes into stable daughter atoms.",
      D: "Common systems include Potassium-Argon, Uranium-Lead, and Carbon-14."
    },
    options: ["Relative Dating", "Radiometric Dating", "Biostratigraphy", "Magnetostratigraphy"],
    correctOption: "Radiometric Dating",
    explanation: "Radiometric dating measures the decay of radioactive isotopes at known half-life rates to calculate the absolute chronological age of rocks and fossils."
  },
  {
    id: 69,
    unit: "Unit IV",
    category: "geological-time-concepts",
    questionNumber: 9,
    answer: "Precambrian",
    clues: {
      A: "I am an informal mega-interval representing the vast majority of Earth's planetary existence.",
      B: "I encompass approximately 88% of all geological time, spanning from 4.54 billion to 541 million years ago.",
      C: "I comprise the Hadean, Archean, and Proterozoic eons prior to the explosion of shelled macroscopic life.",
      D: "I ended at the base of the Cambrian period with the appearance of complex multicellular skeletal faunas."
    },
    options: ["Phanerozoic", "Precambrian", "Paleozoic", "Mesozoic"],
    correctOption: "Precambrian",
    explanation: "The Precambrian is the informal super-eon spanning ~88% of Earth's history prior to the Cambrian Period (~541 Ma)."
  },
  {
    id: 70,
    unit: "Unit IV",
    category: "geological-time-concepts",
    questionNumber: 10,
    answer: "Phanerozoic Eon",
    clues: {
      A: "My name is derived from Greek words meaning 'visible or manifest life'.",
      B: "I encompass the most recent 541 million years of Earth history.",
      C: "I am characterized by the dramatic diversification of animals with mineralized shells, carapaces, and skeletons.",
      D: "I am partitioned into the Paleozoic, Mesozoic, and Cenozoic Eras, extending to the present day."
    },
    options: ["Proterozoic Eon", "Phanerozoic Eon", "Archean Eon", "Hadean Eon"],
    correctOption: "Phanerozoic Eon",
    explanation: "The Phanerozoic Eon ('visible life') is the current geological eon beginning 541 million years ago, characterized by abundant fossilized multicellular organisms."
  },

  // =========================================================================
  // UNIT IV — CATEGORY 8: Geological Succession & Representative Animals (Questions 71 - 80)
  // =========================================================================
  {
    id: 71,
    unit: "Unit IV",
    category: "geological-succession-animals",
    questionNumber: 1,
    answer: "Cambrian Explosion",
    clues: {
      A: "I am the most famous geologically rapid macroevolutionary radiation event in Earth history.",
      B: "I occurred approximately 541 to 520 million years ago in warm shallow epicontinental seas.",
      C: "During my brief window, virtually all modern animal phyla developed hard skeletal mineralized body plans.",
      D: "The Burgess Shale and Chengjiang fossil beds provide breathtaking snapshots of my bizarre animal diversity."
    },
    options: ["Great Oxidation Event", "Cambrian Explosion", "Devonian Radiation", "Avalon Explosion"],
    correctOption: "Cambrian Explosion",
    explanation: "The Cambrian Explosion (~541 Ma) was a rapid evolutionary radiation where nearly all major modern bilaterian animal phyla appeared in the fossil record."
  },
  {
    id: 72,
    unit: "Unit IV",
    category: "geological-succession-animals",
    questionNumber: 2,
    answer: "Devonian Period",
    clues: {
      A: "I am a major Paleozoic period lasting from 419 to 359 million years ago.",
      B: "I witnessed the explosive diversification of agnathans, placoderms, sharks, and bony fishes.",
      C: "Sarcopterygian fishes gave rise to the first stem tetrapods walking near shorelines during my late stages.",
      D: "Because of my extraordinary aquatic radiation, I am universally crowned the 'Age of Fishes'."
    },
    options: ["Silurian Period", "Devonian Period", "Carboniferous Period", "Permian Period"],
    correctOption: "Devonian Period",
    explanation: "The Devonian Period is famously known as the 'Age of Fishes' due to the remarkable radiation of placoderms, sarcopterygians, and chondrichthyans."
  },
  {
    id: 73,
    unit: "Unit IV",
    category: "geological-succession-animals",
    questionNumber: 3,
    answer: "Carboniferous Period",
    clues: {
      A: "I am a Paleozoic period lasting from 359 to 299 million years ago, famous for vast swamp forests.",
      B: "Atmospheric oxygen levels spiked to an unprecedented ~35%, fueling gigantism in terrestrial arthropods.",
      C: "Representative animals included giant griffinflies (Meganeura), 2-meter millipedes (Arthropleura), and early labyrinthodont amphibians.",
      D: "I saw the revolutionary evolutionary origin of the amniotic egg, spawning the first true reptiles."
    },
    options: ["Devonian Period", "Carboniferous Period", "Permian Period", "Triassic Period"],
    correctOption: "Carboniferous Period",
    explanation: "The Carboniferous Period saw extensive coal swamps, high atmospheric oxygen supporting giant arthropods, amphibian radiation, and the origin of amniotes."
  },
  {
    id: 74,
    unit: "Unit IV",
    category: "geological-succession-animals",
    questionNumber: 4,
    answer: "Permian-Triassic Extinction",
    clues: {
      A: "I represent the most cataclysmic biological crisis in the entire 4.5-billion-year history of Earth.",
      B: "Occurred approximately 252 million years ago at the boundary between the Paleozoic and Mesozoic Eras.",
      C: "Triggered by catastrophic massive volcanism in the Siberian Traps causing hyperthermal oceans and anoxia.",
      D: "Colloquially known as 'The Great Dying', I wiped out an estimated 96% of all marine species and 70% of terrestrial vertebrate families."
    },
    options: ["K-Pg Extinction", "Late Devonian Extinction", "Permian-Triassic Extinction", "Ordovician-Silurian Extinction"],
    correctOption: "Permian-Triassic Extinction",
    explanation: "The Permian-Triassic extinction event (~252 Ma), or 'The Great Dying', was Earth's most severe extinction, eliminating ~96% of marine species."
  },
  {
    id: 75,
    unit: "Unit IV",
    category: "geological-succession-animals",
    questionNumber: 5,
    answer: "Mesozoic Era",
    clues: {
      A: "I am the intermediate geological era of the Phanerozoic Eon, lasting from 252 to 66 million years ago.",
      B: "I am partitioned into three famous periods: Triassic, Jurassic, and Cretaceous.",
      C: "My ecosystems were dominated globally on land by dinosaurs, in the air by pterosaurs, and in the seas by ichthyosaurs and plesiosaurs.",
      D: "I am universally celebrated in biological science as the glorious 'Age of Reptiles'."
    },
    options: ["Paleozoic Era", "Cenozoic Era", "Mesozoic Era", "Proterozoic Era"],
    correctOption: "Mesozoic Era",
    explanation: "The Mesozoic Era ('Age of Reptiles'), spanning Triassic through Cretaceous, was characterized by the dominance of non-avian dinosaurs and giant marine reptiles."
  },
  {
    id: 76,
    unit: "Unit IV",
    category: "geological-succession-animals",
    questionNumber: 6,
    answer: "K-Pg Extinction",
    clues: {
      A: "I ended the Mesozoic Era exactly 66 million years ago.",
      B: "Caused by the impact of a 10-kilometer asteroid at the Chicxulub crater on the Yucatán Peninsula.",
      C: "I produced global wildfires, acid rain, and an impact winter that collapsed worldwide photosynthetic food webs.",
      D: "I famously wiped out the ammonites, pterosaurs, and all non-avian dinosaurs, clearing ecological niches for mammalian radiation."
    },
    options: ["Permian Extinction", "K-Pg Extinction", "Triassic Extinction", "Ordovician Extinction"],
    correctOption: "K-Pg Extinction",
    explanation: "The Cretaceous-Paleogene (K-Pg) extinction event (66 Ma), caused by the Chicxulub asteroid impact, terminated the non-avian dinosaurs and opened niches for mammals."
  },
  {
    id: 77,
    unit: "Unit IV",
    category: "geological-succession-animals",
    questionNumber: 7,
    answer: "Cenozoic Era",
    clues: {
      A: "I am the current and ongoing geological era, beginning 66 million years ago after the K-Pg boundary.",
      B: "My periods are the Paleogene, Neogene, and Quaternary.",
      C: "With dinosaurs gone, birds and warm-blooded furred vertebrates underwent dramatic adaptive radiation.",
      D: "I am popularly referred to as the 'Age of Mammals'."
    },
    options: ["Mesozoic Era", "Cenozoic Era", "Paleozoic Era", "Neoproterozoic Era"],
    correctOption: "Cenozoic Era",
    explanation: "The Cenozoic Era ('Age of Mammals'), spanning 66 million years ago to the present, is marked by the explosive adaptive radiation of mammals and angiosperms."
  },
  {
    id: 78,
    unit: "Unit IV",
    category: "geological-succession-animals",
    questionNumber: 8,
    answer: "Pleistocene Megafauna",
    clues: {
      A: "We are an impressive guild of giant animals that dominated the globe during the Quaternary Ice Ages.",
      B: "Our bodies exhibited extreme morphological cold-weather adaptations: massive body mass, dense fur, and thick fat reserves.",
      C: "Representative members include the Woolly Mammoth, Woolly Rhino, Saber-toothed Cat (Smilodon), and Giant Ground Sloth.",
      D: "Most of us went extinct near the transition to the Holocene (~11,700 years ago) due to climate warming and human overkill."
    },
    options: ["Burgess Shale Fauna", "Pleistocene Megafauna", "Ediacaran Biota", "Pelycosaurs"],
    correctOption: "Pleistocene Megafauna",
    explanation: "The Pleistocene Megafauna were large-bodied, cold-adapted mammals (mammoths, sabertooths, giant sloths) that flourished during Ice Age glaciations."
  },
  {
    id: 79,
    unit: "Unit IV",
    category: "geological-succession-animals",
    questionNumber: 9,
    answer: "Burgess Shale",
    clues: {
      A: "I am a UNESCO World Heritage fossil lagerstätte discovered in 1909 by Charles Doolittle Walcott.",
      B: "Located in the Canadian Rocky Mountains of British Columbia, dating to the Middle Cambrian (~508 Ma).",
      C: "I am world-renowned for the exceptional soft-tissue preservation of early marine invertebrates.",
      D: "Iconic bizarre animals unearthed from my dark shale include Anomalocaris, Opabinia, Hallucigenia, and Pikaia."
    },
    options: ["Solnhofen Limestone", "Burgess Shale", "La Brea Tar Pits", "Green River Formation"],
    correctOption: "Burgess Shale",
    explanation: "The Burgess Shale is a celebrated Middle Cambrian Canadian fossil locality preserving exquisite soft-tissue anatomy of early Cambrian animals like Anomalocaris."
  },
  {
    id: 80,
    unit: "Unit IV",
    category: "geological-succession-animals",
    questionNumber: 10,
    answer: "Ediacaran Biota",
    clues: {
      A: "We are the oldest known complex macroscopic multicellular communities in Earth's fossil record.",
      B: "We flourished in shallow seas at the end of the Proterozoic Eon, between 575 and 541 million years ago.",
      C: "We had soft, quilted, frond-like or disc-like sheet bodies lacking hard mineralized shells or jaws.",
      D: "Named after the Ediacara Hills of South Australia, our famous representatives include Dickinsonia and Charnia."
    },
    options: ["Burgess Fauna", "Ediacaran Biota", "Tommotian Fauna", "Mammutidae"],
    correctOption: "Ediacaran Biota",
    explanation: "The Ediacaran Biota (~575–541 Ma) represents the earliest known macroscopic multicellular organisms, characterized by soft-bodied, quilted, frond-like forms."
  },

  // =========================================================================
  // UNIT V — CATEGORY 9: Minor Phyla I (Questions 81 - 90)
  // =========================================================================
  {
    id: 81,
    unit: "Unit V",
    category: "minor-phyla-1",
    questionNumber: 1,
    answer: "Rotifera",
    clues: {
      A: "We are a phylum of microscopic, pseudocoelomate, primarily freshwater invertebrates.",
      B: "We possess a syncytial epidermis, bilateral symmetry, eutely, and often a protective cuticular lorica.",
      C: "Our anterior end bears a specialized ciliated crown called the corona whose beating resembles a revolving cogwheel.",
      D: "Antony van Leeuwenhoek discovered us in 1702, popularizing our common name: 'wheel animalcules'."
    },
    options: ["Gastrotricha", "Rotifera", "Kinorhyncha", "Nematoda"],
    correctOption: "Rotifera",
    explanation: "Rotifera ('wheel animalcules') are microscopic pseudocoelomate animals bearing an anterior ciliated corona and a grinding pharynx (mastax)."
  },
  {
    id: 82,
    unit: "Unit V",
    category: "minor-phyla-1",
    questionNumber: 2,
    answer: "Mastax",
    clues: {
      A: "I am an internal anatomical structure unique to the Phylum Rotifera.",
      B: "I am a modified, muscular pharynx located directly behind the ciliated mouth.",
      C: "My interior contains complex, hardened chitinous jaw-like elements called trophi.",
      D: "I perform the mechanical mastication, crushing, and grinding of ingested food particles."
    },
    options: ["Prototroch", "Mastax", "Radula", "Introvert"],
    correctOption: "Mastax",
    explanation: "The mastax is the muscular, jaw-bearing pharynx unique to rotifers, containing chitinous masticatory pieces called trophi."
  },
  {
    id: 83,
    unit: "Unit V",
    category: "minor-phyla-1",
    questionNumber: 3,
    answer: "Acanthocephala",
    clues: {
      A: "We are an entire phylum of specialized obligate endoparasitic pseudocoelomate worms.",
      B: "Our adults live in the intestines of vertebrates, while our larvae develop inside arthropod intermediate hosts.",
      C: "Like tapeworms, we have completely lost all traces of a mouth and digestive tract, absorbing nutrients across our body wall.",
      D: "Our defining diagnostic trait is an anterior eversible, cylindrical proboscis armed with curved chitinous hooks."
    },
    options: ["Nematoda", "Acanthocephala", "Platyhelminthes", "Priapulida"],
    correctOption: "Acanthocephala",
    explanation: "Acanthocephala ('spiny-headed worms') are endoparasitic pseudocoelomates lacking a gut and possessing an eversible, hooked proboscis."
  },
  {
    id: 84,
    unit: "Unit V",
    category: "minor-phyla-1",
    questionNumber: 4,
    answer: "Sipuncula",
    clues: {
      A: "We are an unsegmented phylum of marine coelomate worms, commonly known as 'peanut worms'.",
      B: "When disturbed, we retract the anterior portion of our body into our plump trunk, resembling a peanut shell.",
      C: "Our anterior retractable region is an introvert crowned with ciliated tentacles surrounding the mouth.",
      D: "Our alimentary canal is famously twisted into a U-shaped loop, with the anus located anteriorly on the dorsal trunk."
    },
    options: ["Echiura", "Sipuncula", "Pogonophora", "Nemertea"],
    correctOption: "Sipuncula",
    explanation: "Sipuncula (peanut worms) are unsegmented marine coelomates with a retractable introvert, U-shaped gut with an anterior dorsal anus, and no segmentation."
  },
  {
    id: 85,
    unit: "Unit V",
    category: "minor-phyla-1",
    questionNumber: 5,
    answer: "Pogonophora",
    clues: {
      A: "We are deep-sea, benthic tubiculous worms commonly known as 'beard worms' (Family Siboglinidae).",
      B: "We inhabit secretively inside upright, rigid tubes composed of protein and chitin on the ocean floor.",
      C: "In full adult life, we completely lack a mouth, gut, and anus.",
      D: "We thrive around deep-sea hydrothermal vents and cold seeps by harboring chemosynthetic sulfur-oxidizing endosymbiotic bacteria."
    },
    options: ["Pogonophora", "Chaetognatha", "Brachiopoda", "Gnathostomulida"],
    correctOption: "Pogonophora",
    explanation: "Pogonophora (beard worms / siboglinids) are deep-sea tubeworms lacking a digestive system that derive nutrition from chemosynthetic bacterial endosymbionts."
  },
  {
    id: 86,
    unit: "Unit V",
    category: "minor-phyla-1",
    questionNumber: 6,
    answer: "Trophosome",
    clues: {
      A: "I am a specialized internal organ found inside pogonophoran tubeworms like Riftia pachyptila.",
      B: "I occupy a major portion of the coelomic cavity, highly vascularized with red blood containing hemoglobin.",
      C: "Embryologically, I develop from modified endodermal tissue of the primitive gut.",
      D: "I am packed with trillions of chemolithoautotrophic sulfur-oxidizing bacteria that synthesize food for the host worm."
    },
    options: ["Chloragogen", "Trophosome", "Clitellum", "Hepatopancreas"],
    correctOption: "Trophosome",
    explanation: "The trophosome is a vascularized internal organ in pogonophorans (such as hydrothermal vent giant tubeworms) that houses symbiotic sulfur-oxidizing bacteria."
  },
  {
    id: 87,
    unit: "Unit V",
    category: "minor-phyla-1",
    questionNumber: 7,
    answer: "Introvert",
    clues: {
      A: "I am a prominent diagnostic anatomical region found in sipunculid and priapulid worms.",
      B: "I am located at the extreme anterior end of the body.",
      C: "I can be rapidly introverted (inverted inside-out) into the body trunk by powerful retractor muscles.",
      D: "When fully extended, my tip displays tentacles or spines utilized for burrowing and gathering detritus."
    },
    options: ["Proboscis", "Introvert", "Corona", "Lophophore"],
    correctOption: "Introvert",
    explanation: "An introvert is an eversible, retractable anterior body region characteristic of Sipuncula and priapulids, operated by specialized retractor muscles."
  },
  {
    id: 88,
    unit: "Unit V",
    category: "minor-phyla-1",
    questionNumber: 8,
    answer: "Lorica",
    clues: {
      A: "I am a hardened external protective structure found in many rotifers and loriciferans.",
      B: "I am secreted by the syncytial epidermis beneath a thin cuticular layer.",
      C: "I often form rigid plates, facets, ridges, and spines that provide defense against micro-predators.",
      D: "My presence divides rotifers into 'loricate' forms with armored boxes and 'illoricite' soft-bodied forms."
    },
    options: ["Periderm", "Lorica", "Theca", "Frustule"],
    correctOption: "Lorica",
    explanation: "A lorica is a rigid, protective shell-like external cuticular casing enclosing the body in many species of rotifers and loriciferans."
  },
  {
    id: 89,
    unit: "Unit V",
    category: "minor-phyla-1",
    questionNumber: 9,
    answer: "Syndermata",
    clues: {
      A: "I am a modern phylogenetic clade supported strongly by both ultrastructure and molecular sequencing.",
      B: "I unite the free-living Phylum Rotifera with the parasitic Phylum Acanthocephala.",
      C: "My shared derived synapomorphy is a unique syncytial epidermis reinforced by an intracytoplasmic lamina.",
      D: "Because acanthocephalans are nested inside rotifers, I demonstrate that spiny-headed worms are highly modified parasitic rotifers."
    },
    options: ["Ecdysozoa", "Syndermata", "Lophophorata", "Gnathifera"],
    correctOption: "Syndermata",
    explanation: "Syndermata is the monophyletic clade uniting Rotifera and Acanthocephala based on their unique syncytial epidermis and genomic similarities."
  },
  {
    id: 90,
    unit: "Unit V",
    category: "minor-phyla-1",
    questionNumber: 10,
    answer: "Pelagosphera Larva",
    clues: {
      A: "I am a specialized swimming marine larval stage in the life cycle of Sipuncula.",
      B: "I develop secondarily from an initial trochophore-like stage.",
      C: "I have a prominent ciliated metatroch band and can survive for months drifting in open ocean currents.",
      D: "My long pelagic lifespan enables peanut worms to disperse across vast ocean basins before settling into benthic sediments."
    },
    options: ["Bipinnaria", "Pelagosphera Larva", "Planula", "Pilidium"],
    correctOption: "Pelagosphera Larva",
    explanation: "The pelagosphera is a long-lived oceanic swimming larval stage characteristic of many sipunculids that develops after the trochophore stage."
  },

  // =========================================================================
  // UNIT V — CATEGORY 10: Minor Phyla II (Questions 91 - 100)
  // =========================================================================
  {
    id: 91,
    unit: "Unit V",
    category: "minor-phyla-2",
    questionNumber: 1,
    answer: "Lophophore",
    clues: {
      A: "I am a specialized feeding and respiratory organ that gives name to the classical Lophophorata.",
      B: "I consist of a circular, horseshoe-shaped, or coiled fold of the body wall.",
      C: "I bear a crown of hollow, ciliated tentacles surrounding the mouth, while the anus is positioned outside.",
      D: "My interior contains an extension of the coelom, shared by Ectoprocta, Brachiopoda, and Phoronida."
    },
    options: ["Corona", "Lophophore", "Introvert", "Aristotle's Lantern"],
    correctOption: "Lophophore",
    explanation: "A lophophore is a horseshoe-shaped or circular ciliated tentacular feeding structure containing a coelomic cavity, shared by bryozoans, brachiopods, and phoronids."
  },
  {
    id: 92,
    unit: "Unit V",
    category: "minor-phyla-2",
    questionNumber: 2,
    answer: "Ectoprocta",
    clues: {
      A: "We are an abundant phylum of microscopic, colonial aquatic lophophorates, commonly known as 'moss animals' (Bryozoa).",
      B: "Our colonies are composed of thousands of minute, interconnected modular individuals called zooids.",
      C: "Each zooid secretes a rigid organic or calcified protective exoskeletal box called a zooecium.",
      D: "Our name translates from Greek as 'outside anus', because our anus opens completely outside our ciliated lophophore ring."
    },
    options: ["Entoprocta", "Ectoprocta", "Brachiopoda", "Phoronida"],
    correctOption: "Ectoprocta",
    explanation: "Ectoprocta (Bryozoa / moss animals) are colonial lophophorate coelomates whose anus opens outside the tentacular crown of the lophophore."
  },
  {
    id: 93,
    unit: "Unit V",
    category: "minor-phyla-2",
    questionNumber: 3,
    answer: "Entoprocta",
    clues: {
      A: "We are a small phylum of solitary or colonial pseudocoelomate marine animals, also called Kamptozoa ('nodding animals').",
      B: "Our body consists of a cup-shaped calyx mounted on an anchor stalk.",
      C: "Our calyx is crowned with a ring of ciliated tentacles that roll inwards when disturbed.",
      D: "Our name means 'inside anus', because both our mouth and our anus open inside the tentacular ring."
    },
    options: ["Ectoprocta", "Entoprocta", "Brachiopoda", "Chaetognatha"],
    correctOption: "Entoprocta",
    explanation: "Entoprocta (Kamptozoa) are pseudocoelomates whose tentacular ring encloses both the mouth and the anus, unlike true ectoprocts."
  },
  {
    id: 94,
    unit: "Unit V",
    category: "minor-phyla-2",
    questionNumber: 4,
    answer: "Brachiopoda",
    clues: {
      A: "We are a venerable phylum of solitary, marine, coelomate lophophorates known colloquially as 'lamp shells'.",
      B: "Our soft body is encased inside two calcareous or phosphatic valves that superficially resemble bivalve molluscs.",
      C: "Unlike clams, our two valves are unequal in size and oriented dorsally and ventrally rather than laterally.",
      D: "Our ventral pedicle valve usually features a prominent beak with an opening for a fleshy anchoring stalk."
    },
    options: ["Bivalvia", "Brachiopoda", "Ectoprocta", "Cirripedia"],
    correctOption: "Brachiopoda",
    explanation: "Brachiopods (lamp shells) are bivalved lophophorates with dorsal and ventral valves (rather than lateral shells like clams) anchored by a pedicle."
  },
  {
    id: 95,
    unit: "Unit V",
    category: "minor-phyla-2",
    questionNumber: 5,
    answer: "Chaetognatha",
    clues: {
      A: "We are an exclusively marine, planktonic phylum of voracious micro-predators commonly known as 'arrow worms'.",
      B: "Our elongate, torpedo-shaped bodies are nearly 100% transparent in ocean water.",
      C: "We feature horizontal lateral fins and a tail fin used for rapid darting swimming motions.",
      D: "Our head is armed with formidable, movable chitinous grasping spines used to seize copepods and larval fishes."
    },
    options: ["Nematomorpha", "Chaetognatha", "Kinorhyncha", "Gastrotricha"],
    correctOption: "Chaetognatha",
    explanation: "Chaetognatha (arrow worms) are transparent, torpedo-shaped marine predators equipped with chitinous grasping spines around the mouth and horizontal fins."
  },
  {
    id: 96,
    unit: "Unit V",
    category: "minor-phyla-2",
    questionNumber: 6,
    answer: "Pedicle",
    clues: {
      A: "I am a prominent fleshy muscular stalk found in the phylum Brachiopoda.",
      B: "I emerge through a specialized foramen at the beak of the larger ventral valve.",
      C: "I secrete chitinous anchoring fibrils or cementing substances at my distal tip.",
      D: "My primary function is to securely anchor the sessile lamp shell to rocks, shells, or muddy substrate."
    },
    options: ["Byssus", "Pedicle", "Introvert", "Stolons"],
    correctOption: "Pedicle",
    explanation: "The pedicle is a fleshy, muscular stalk in brachiopods that anchors the animal to the hard or sandy marine substrate."
  },
  {
    id: 97,
    unit: "Unit V",
    category: "minor-phyla-2",
    questionNumber: 7,
    answer: "Statoblasts",
    clues: {
      A: "We are specialized asexual survival gemmule-like structures produced by freshwater bryozoans (Phylactolaemata).",
      B: "We are produced internally along the funiculus during late summer and autumn.",
      C: "We are encased in two protective, sclerotized biconvex chitinous valves resistant to freezing and complete desiccation.",
      D: "When favorable spring conditions return, we germinate into a new founder zooid (ancestrula) to establish a fresh colony."
    },
    options: ["Statocysts", "Statoblasts", "Gemmules", "Cysticerci"],
    correctOption: "Statoblasts",
    explanation: "Statoblasts are tough, dormant asexual reproductive bodies formed by freshwater bryozoans to survive winter freezing and desiccation."
  },
  {
    id: 98,
    unit: "Unit V",
    category: "minor-phyla-2",
    questionNumber: 8,
    answer: "Avicularium",
    clues: {
      A: "I am a specialized, polymorphic heterozooid found in marine gymnolaemate bryozoan colonies.",
      B: "My appearance strikingly resembles a miniature bird's head mounted on the colony wall.",
      C: "My modified operculum functions like a sharp, snapping lower jaw operated by strong adductor muscles.",
      D: "My duty is defense: snapping shut to crush fouling organisms, settling larvae, and small predators."
    },
    options: ["Vibraculum", "Avicularium", "Zooecium", "Kenozooid"],
    correctOption: "Avicularium",
    explanation: "An avicularium is a modified defensive zooid in bryozoan colonies resembling a bird's head with snapping jaws that prevents fouling by other organisms."
  },
  {
    id: 99,
    unit: "Unit V",
    category: "minor-phyla-2",
    questionNumber: 9,
    answer: "Zooid",
    clues: {
      A: "I am the basic structural and functional individual unit of any modular colonial animal.",
      B: "I am physically and physiologically connected to my neighbors by living tissue channels.",
      C: "In bryozoan colonies, I consist of a living polypide inside a non-living protective cystid.",
      D: "All members of a colony are genetically identical clones formed by asexual budding from a primary ancestrula."
    },
    options: ["Polymer", "Zooid", "Metamere", "Proglottid"],
    correctOption: "Zooid",
    explanation: "A zooid is an individual member of a colonial organism, such as in Ectoprocta (Bryozoa) or colonial hydroids, budded from a single founder."
  },
  {
    id: 100,
    unit: "Unit V",
    category: "minor-phyla-2",
    questionNumber: 10,
    answer: "Cyphonautes Larva",
    clues: {
      A: "I am a distinctive, planktonic larval stage found in certain marine bryozoan life cycles.",
      B: "My body has a compressed, triangular, or bell-like silhouette.",
      C: "I am enclosed within two transparent, delicate bivalved triangular shells.",
      D: "I possess an active ciliated corona and complete functional gut, drifting in coastal waters before settling to metamorphose into an ancestrula."
    },
    options: ["Trochophore Larva", "Cyphonautes Larva", "Veliger Larva", "Nauplius Larva"],
    correctOption: "Cyphonautes Larva",
    explanation: "The cyphonautes is the bivalved, triangular planktotrophic larval stage of certain marine bryozoans (Ectoprocta)."
  }
];
