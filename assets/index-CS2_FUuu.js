(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{constructor(e={}){this.settings=e.settings||{timerDurationA:20,timerDurationB:20,timerDurationC:20,timerDurationD:20,pointsA:4,pointsB:3,pointsC:2,pointsD:1,pointsWrong:0,questionsPerGame:10,autoAdvanceDelayMs:1600,revealAnswerOnD:!0,timeoutAction:`advance`},this.listeners=[],this.timerInterval=null,this.reset()}reset(){this.stopTimer(),this.category=null,this.questions=[],this.currentIndex=0,this.currentStage=`A`,this.timeLeft=20,this.maxTimeForStage=20,this.score=0,this.maxPossibleScore=0,this.isAnsweringAllowed=!1,this.isGameOver=!1,this.lastFeedback=null,this.wrongGuessesThisStage=[],this.questionResults=[],this.stageBreakdown={A:0,B:0,C:0,D:0,none:0},this.playerName=`Detective Player`}subscribe(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(t=>t!==e)}}notify(e=`stateChange`){let t=this.getSnapshot();t.eventType=e,this.listeners.forEach(e=>{try{e(t)}catch(e){console.error(`Listener error:`,e)}})}getSnapshot(){let e=this.getCurrentQuestion();return{category:this.category,currentIndex:this.currentIndex,totalQuestions:this.questions.length,currentQuestion:e,currentStage:this.currentStage,timeLeft:this.timeLeft,maxTimeForStage:this.maxTimeForStage,score:this.score,maxPossibleScore:this.maxPossibleScore,isAnsweringAllowed:this.isAnsweringAllowed,isGameOver:this.isGameOver,lastFeedback:this.lastFeedback,wrongGuessesThisStage:[...this.wrongGuessesThisStage],questionResults:[...this.questionResults],stageBreakdown:{...this.stageBreakdown},playerName:this.playerName}}startQuiz(e,t,n=`Detective Player`,r=null){r&&(this.settings={...this.settings,...r}),this.reset(),this.category=e,this.playerName=n;let i=t.filter(t=>String(t.category).toLowerCase()===String(e.id).toLowerCase()),a=Math.min(this.settings.questionsPerGame||10,i.length);if(this.questions=i.slice(0,a),this.maxPossibleScore=this.questions.length*(this.settings.pointsA||4),this.questions.length===0){this.isGameOver=!0,this.notify();return}this.currentIndex=0,this.startQuestion(0)}getCurrentQuestion(){return this.currentIndex>=0&&this.currentIndex<this.questions.length?this.questions[this.currentIndex]:null}getStageDuration(e){switch(e){case`A`:return Number(this.settings.timerDurationA)||20;case`B`:return Number(this.settings.timerDurationB)||20;case`C`:return Number(this.settings.timerDurationC)||20;case`D`:return Number(this.settings.timerDurationD)||20;default:return 20}}getStagePoints(e){switch(e){case`A`:return Number(this.settings.pointsA)||4;case`B`:return Number(this.settings.pointsB)||3;case`C`:return Number(this.settings.pointsC)||2;case`D`:return Number(this.settings.pointsD)||1;default:return 0}}startQuestion(e){this.stopTimer(),this.currentIndex=e,this.currentStage=`A`,this.wrongGuessesThisStage=[],this.lastFeedback=null,this.isAnsweringAllowed=!0,this.startStageTimer(`A`),this.notify()}startStageTimer(e){this.stopTimer(),this.maxTimeForStage=this.getStageDuration(e),this.timeLeft=this.maxTimeForStage,this.timerInterval=setInterval(()=>{--this.timeLeft,this.timeLeft<=0?(this.timeLeft=0,this.handleTimeout()):this.notify(`tick`)},1e3)}stopTimer(){this.timerInterval&&=(clearInterval(this.timerInterval),null)}handleTimeout(){this.stopTimer(),this.isAnsweringAllowed=!1;let e=this.getCurrentQuestion();e&&(this.currentStage===`A`?(this.lastFeedback={type:`timeout`,message:`Time's up for Clue A! Advancing to Clue B...`,stage:`A`,points:0},this.notify(),setTimeout(()=>{this.advanceToStage(`B`)},1e3)):this.currentStage===`B`?(this.lastFeedback={type:`timeout`,message:`Time's up for Clue B! Advancing to Clue C...`,stage:`B`,points:0},this.notify(),setTimeout(()=>{this.advanceToStage(`C`)},1e3)):this.currentStage===`C`?(this.lastFeedback={type:`timeout`,message:`Time's up for Clue C! Advancing to Final Clue D...`,stage:`C`,points:0},this.notify(),setTimeout(()=>{this.advanceToStage(`D`)},1e3)):this.currentStage===`D`&&(this.stageBreakdown.none=(this.stageBreakdown.none||0)+1,this.questionResults.push({questionId:e.id,answer:e.answer,correctOption:e.correctOption,userOption:null,isCorrect:!1,stage:`D`,points:0,timedOut:!0,explanation:e.explanation}),this.lastFeedback={type:`incorrect-d`,message:`Time's up! The correct answer was "${e.correctOption}".`,correctOption:e.correctOption,explanation:e.explanation,points:0,stage:`D`,timedOut:!0},this.notify(),setTimeout(()=>{this.nextQuestion()},this.settings.autoAdvanceDelayMs||2e3)))}advanceToStage(e){this.currentStage=e,this.wrongGuessesThisStage=[],this.lastFeedback=null,this.isAnsweringAllowed=!0,this.startStageTimer(e),this.notify()}submitAnswer(e){if(!this.isAnsweringAllowed)return null;let t=this.getCurrentQuestion();if(!t||this.wrongGuessesThisStage.includes(e))return null;if(String(e).trim().toLowerCase()===String(t.correctOption).trim().toLowerCase()){this.stopTimer(),this.isAnsweringAllowed=!1;let n=this.getStagePoints(this.currentStage);return this.score+=n,this.stageBreakdown[this.currentStage]=(this.stageBreakdown[this.currentStage]||0)+1,this.questionResults.push({questionId:t.id,answer:t.answer,correctOption:t.correctOption,userOption:e,isCorrect:!0,stage:this.currentStage,points:n,explanation:t.explanation}),this.lastFeedback={type:`correct`,message:`Brilliant! Correct at Stage ${this.currentStage}! (+${n} pts)`,selectedOption:e,correctOption:t.correctOption,explanation:t.explanation,points:n,stage:this.currentStage},this.notify(),setTimeout(()=>{this.nextQuestion()},this.settings.autoAdvanceDelayMs||1600),{isCorrect:!0,points:n,stage:this.currentStage}}if(this.wrongGuessesThisStage.push(e),this.currentStage===`A`)return this.lastFeedback={type:`incorrect-stage`,message:`Not quite! 0 points for Clue A. Moving to Clue B...`,selectedOption:e,stage:`A`,points:0},this.notify(),setTimeout(()=>{this.advanceToStage(`B`)},1200),{isCorrect:!1,points:0,nextStage:`B`};if(this.currentStage===`B`)return this.lastFeedback={type:`incorrect-stage`,message:`Not quite! 0 points for Clue B. Moving to Clue C...`,selectedOption:e,stage:`B`,points:0},this.notify(),setTimeout(()=>{this.advanceToStage(`C`)},1200),{isCorrect:!1,points:0,nextStage:`C`};if(this.currentStage===`C`)return this.lastFeedback={type:`incorrect-stage`,message:`Not quite! 0 points for Clue C. Moving to Final Clue D...`,selectedOption:e,stage:`C`,points:0},this.notify(),setTimeout(()=>{this.advanceToStage(`D`)},1200),{isCorrect:!1,points:0,nextStage:`D`};if(this.currentStage===`D`)return this.stopTimer(),this.isAnsweringAllowed=!1,this.stageBreakdown.none=(this.stageBreakdown.none||0)+1,this.questionResults.push({questionId:t.id,answer:t.answer,correctOption:t.correctOption,userOption:e,isCorrect:!1,stage:`D`,points:0,explanation:t.explanation}),this.lastFeedback={type:`incorrect-d`,message:`Incorrect! The correct answer was "${t.correctOption}".`,selectedOption:e,correctOption:t.correctOption,explanation:t.explanation,points:0,stage:`D`},this.notify(),setTimeout(()=>{this.nextQuestion()},this.settings.autoAdvanceDelayMs||2200),{isCorrect:!1,points:0,revealedAnswer:t.correctOption}}nextQuestion(){this.stopTimer();let e=this.currentIndex+1;e<this.questions.length?this.startQuestion(e):this.finishGame()}finishGame(){this.stopTimer(),this.isGameOver=!0,this.isAnsweringAllowed=!1,this.notify()}getFinalStats(){let e=this.questions.length,t=this.questionResults.filter(e=>e.isCorrect).length,n=e-t,r=e>0?Math.round(this.score/(this.maxPossibleScore||1)*100):0,i=e>0?Math.round(t/e*100):0;return{playerName:this.playerName,categoryId:this.category?this.category.id:`unknown`,categoryName:this.category?this.category.name:`Unknown`,categoryIcon:this.category?this.category.icon:`🎯`,unit:this.category?this.category.unit||`Unit I`:``,unitTitle:this.category&&this.category.unitTitle||``,score:this.score,maxPossibleScore:this.maxPossibleScore,questionsCompleted:e,correctCount:t,incorrectCount:n,percentage:r,accuracy:i,stageBreakdown:{...this.stageBreakdown},questionResults:[...this.questionResults]}}},t=[{id:`taxonomy-systematics`,unit:`Unit I`,unitTitle:`Principles of Animal Taxonomy`,name:`Taxonomy & Systematics`,icon:`🔬`,description:`Concepts of systematics, classification, taxa, phenons, cladons, sibling species, and biological species.`,color:`#6366f1`,gradient:`linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(79, 70, 229, 0.05) 100%)`,borderColor:`rgba(99, 102, 241, 0.4)`},{id:`nomenclature-biosystematics`,unit:`Unit I`,unitTitle:`Principles of Animal Taxonomy`,name:`Nomenclature & Biosystematics`,icon:`📜`,description:`Binomial rules, ICZN, species & infraspecific ranks, taxonomic keys, catalogues, and numerical taxonomy.`,color:`#8b5cf6`,gradient:`linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(109, 40, 217, 0.05) 100%)`,borderColor:`rgba(139, 92, 246, 0.4)`},{id:`invertebrate-origins-bodyplans`,unit:`Unit II`,unitTitle:`Phylogeny of Invertebrates`,name:`Invertebrate Origins & Body Plans`,icon:`🪸`,description:`Metazoan origins, phylogenetic trees, symmetry, coelom evolution theories, and metamerism.`,color:`#06b6d4`,gradient:`linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(14, 116, 144, 0.05) 100%)`,borderColor:`rgba(6, 182, 212, 0.4)`},{id:`arthropod-mollusca-echinoderm`,unit:`Unit II`,unitTitle:`Phylogeny of Invertebrates`,name:`Arthropod, Molluscan & Echinoderm Phylogeny`,icon:`🦀`,description:`Evolutionary relationships, arthropod & molluscan phylogeny, and echinoderm larval affinities.`,color:`#14b8a6`,gradient:`linear-gradient(135deg, rgba(20, 184, 166, 0.2) 0%, rgba(13, 148, 136, 0.05) 100%)`,borderColor:`rgba(20, 184, 166, 0.4)`},{id:`chordate-origins-fish-evolution`,unit:`Unit III`,unitTitle:`Phylogeny of Vertebrates`,name:`Chordate Origins & Fish Evolution`,icon:`🐟`,description:`Prochordates, theories of chordate origin, ostracoderms, placoderms, and early fish radiation.`,color:`#3b82f6`,gradient:`linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.05) 100%)`,borderColor:`rgba(59, 130, 246, 0.4)`},{id:`tetrapod-vertebrate-evolution`,unit:`Unit III`,unitTitle:`Phylogeny of Vertebrates`,name:`Tetrapod & Vertebrate Evolution`,icon:`🦎`,description:`Amphibian origins, amniote divergence, reptile radiations, bird origins, and mammalian subclasses.`,color:`#10b981`,gradient:`linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.05) 100%)`,borderColor:`rgba(16, 185, 129, 0.4)`},{id:`geological-time-concepts`,unit:`Unit IV`,unitTitle:`Geological Timescale`,name:`Geological Time Concepts`,icon:`⏳`,description:`Eon, Era, Period, Epoch, Age hierarchy, stratigraphy principles, and the geological time scale.`,color:`#f59e0b`,gradient:`linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.05) 100%)`,borderColor:`rgba(245, 158, 11, 0.4)`},{id:`geological-succession-animals`,unit:`Unit IV`,unitTitle:`Geological Timescale`,name:`Geological Succession & Representative Animals`,icon:`🗿`,description:`Evolutionary succession across geological eras, representative animals, radiations, and extinction events.`,color:`#d97706`,gradient:`linear-gradient(135deg, rgba(217, 119, 6, 0.2) 0%, rgba(180, 83, 9, 0.05) 100%)`,borderColor:`rgba(217, 119, 6, 0.4)`},{id:`minor-phyla-1`,unit:`Unit V`,unitTitle:`Evolutionary Trends Among Minor Phyla`,name:`Minor Phyla I`,icon:`🪱`,description:`Anatomy, affinities, and evolutionary trends of Rotifera, Acanthocephala, Pogonophora, and Sipunculida.`,color:`#ec4899`,gradient:`linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(219, 39, 119, 0.05) 100%)`,borderColor:`rgba(236, 72, 153, 0.4)`},{id:`minor-phyla-2`,unit:`Unit V`,unitTitle:`Evolutionary Trends Among Minor Phyla`,name:`Minor Phyla II`,icon:`🐚`,description:`Lophophorate coelomates and chaetognaths: Entoprocta, Ectoprocta (Bryozoa), Brachiopoda, and Chaetognatha.`,color:`#f43f5e`,gradient:`linear-gradient(135deg, rgba(244, 63, 94, 0.2) 0%, rgba(225, 29, 72, 0.05) 100%)`,borderColor:`rgba(244, 63, 94, 0.4)`}],n=[{id:1,unit:`Unit I`,category:`taxonomy-systematics`,questionNumber:1,answer:`Systematics`,clues:{A:`I am a major field within comparative biology focused on organic diversity.`,B:`I explore both extinct and extant organisms to establish their genealogical history.`,C:`I synthesize descriptive taxonomy with phylogenetics, biogeography, and speciation mechanics.`,D:`G. G. Simpson formally defined me as 'the scientific study of the kinds and diversity of organisms and of any and all relationships among them'.`},options:[`Taxonomy`,`Systematics`,`Ecology`,`Morphometrics`],correctOption:`Systematics`,explanation:`Systematics is the broader biological discipline encompassing taxonomy, phylogenetics, and all evolutionary relationships among organisms.`},{id:2,unit:`Unit I`,category:`taxonomy-systematics`,questionNumber:2,answer:`Taxonomy`,clues:{A:`My name is derived from two Greek words meaning 'arrangement' and 'law'.`,B:`I establish the methodological guidelines for describing and cataloguing animal life.`,C:`I am strictly concerned with the identification, naming, and hierarchical grouping of organisms.`,D:`Ernst Mayr described me as 'the theory and practice of classifying organisms'.`},options:[`Taxonomy`,`Biosystematics`,`Phylogeny`,`Cladistics`],correctOption:`Taxonomy`,explanation:`Taxonomy deals specifically with the theory and practice of discovering, describing, naming, and classifying organisms.`},{id:3,unit:`Unit I`,category:`taxonomy-systematics`,questionNumber:3,answer:`Taxon`,clues:{A:`I am a fundamental concept recognized at every tier of the Linnaean hierarchy.`,B:`I represent a real, concrete biological entity rather than an abstract theoretical rank.`,C:`Examples of me include Mammalia, Carnivora, Felidae, and Panthera leo.`,D:`I am formally defined as a taxonomic group of any rank that is sufficiently distinct to be assigned a definite category.`},options:[`Category`,`Taxon`,`Phenon`,`Cohort`],correctOption:`Taxon`,explanation:`A taxon (plural: taxa) is a concrete taxonomic group of real organisms of any rank (such as order Diptera or species Homo sapiens).`},{id:4,unit:`Unit I`,category:`taxonomy-systematics`,questionNumber:4,answer:`Phenon`,clues:{A:`I am an operational concept frequently encountered in numerical taxonomy and phenetics.`,B:`I group animal specimens based solely on overall phenotypic similarity regardless of evolutionary history.`,C:`In phenograms, I am delimited by horizontal phenon lines drawn across similarity indices.`,D:`Ernst Mayr defined me as a sample of phenotypically similar specimens or populations recognized at an empirical level.`},options:[`Cladon`,`Phenon`,`Phylum`,`Deme`],correctOption:`Phenon`,explanation:`A phenon is a group of organisms sharing a given degree of phenotypic resemblance, often defined by similarity cutoff lines in phenograms.`},{id:5,unit:`Unit I`,category:`taxonomy-systematics`,questionNumber:5,answer:`Cladon`,clues:{A:`I represent a modern phylogenetic unit based on shared evolutionary ancestry.`,B:`I am strictly monophyletic, requiring a common ancestor and all its descendents.`,C:`I am recognized on cladograms through shared derived characters known as synapomorphies.`,D:`In phylogenetic systematics, I am synonymous with a clade, contrasting directly with a grade or phenon.`},options:[`Phenon`,`Grade`,`Cladon`,`Morphotype`],correctOption:`Cladon`,explanation:`A cladon (or clade) is a monophyletic branch of a phylogenetic tree consisting of a stem ancestor and all of its descendants.`},{id:6,unit:`Unit I`,category:`taxonomy-systematics`,questionNumber:6,answer:`Sibling Species`,clues:{A:`I pose one of the most intriguing challenges to traditional morphological taxonomy.`,B:`My member populations live in sympatry or allopatry yet never exchange genes in nature.`,C:`We are morphologically indistinguishable or nearly identical to human observers.`,D:`Classic examples include Drosophila pseudoobscura and D. persimilis, or the Anopheles maculipennis mosquito complex.`},options:[`Subspecies`,`Sibling Species`,`Demes`,`Synonyms`],correctOption:`Sibling Species`,explanation:`Sibling (cryptic) species are distinct, reproductively isolated species that are morphologically indistinguishable or exceedingly similar.`},{id:7,unit:`Unit I`,category:`taxonomy-systematics`,questionNumber:7,answer:`Biological Species Concept`,clues:{A:`I shifted taxonomic emphasis from typological morphology to population dynamics.`,B:`I utilize reproductive isolation as the primary boundary criterion between distinct species.`,C:`Formulated most prominently by evolutionary biologist Ernst Mayr in 1942.`,D:`I define species as 'groups of actually or potentially interbreeding natural populations which are reproductively isolated from other such groups'.`},options:[`Typological Species Concept`,`Biological Species Concept`,`Phylogenetic Species Concept`,`Nominalistic Species Concept`],correctOption:`Biological Species Concept`,explanation:`Ernst Mayr's Biological Species Concept defines species based on natural interbreeding populations that are reproductively isolated from others.`},{id:8,unit:`Unit I`,category:`taxonomy-systematics`,questionNumber:8,answer:`Classification`,clues:{A:`I serve as the indexing and information-retrieval storage system of natural science.`,B:`I arrange animals into nested, hierarchical groups based on mutual affinities.`,C:`I construct the classic tiered ranks from Domain and Kingdom down to Genus and Species.`,D:`Simpson defined me as the ordering of animals into groups or sets on the basis of their relationships.`},options:[`Identification`,`Classification`,`Nomenclature`,`Description`],correctOption:`Classification`,explanation:`Classification is the ordering of organisms into hierarchical groups or sets based on similarities, affinities, and evolutionary relationships.`},{id:9,unit:`Unit I`,category:`taxonomy-systematics`,questionNumber:9,answer:`Identification`,clues:{A:`I am a practical diagnostic procedure carried out in museums, labs, and fieldwork.`,B:`I do not create new taxa; I match an unknown specimen to an already established classification.`,C:`Taxonomists utilize diagnostic keys, reference collections, and atlases to perform my task.`,D:`I am the determination of the taxonomic identity of an unknown specimen as belonging to a previously recognized taxon.`},options:[`Identification`,`Nomenclature`,`Phylogeny`,`Typification`],correctOption:`Identification`,explanation:`Identification is the practical process of determining that an unknown specimen belongs to a previously established, described taxon.`},{id:10,unit:`Unit I`,category:`taxonomy-systematics`,questionNumber:10,answer:`Evolutionary Taxonomy`,clues:{A:`I am a traditional school of systematic philosophy developed by Simpson and Mayr.`,B:`I classify organisms by considering both genealogical descent and amount of evolutionary divergence.`,C:`Unlike cladistics, I accept paraphyletic taxa (such as Class Reptilia) when significant adaptive transitions occur.`,D:`I combine phylogenetic branching points with morphological divergence grades to construct classifications.`},options:[`Cladistics`,`Phenetics`,`Evolutionary Taxonomy`,`Numerical Taxonomy`],correctOption:`Evolutionary Taxonomy`,explanation:`Evolutionary taxonomy (Darwinian classification) considers both branching order (cladogenesis) and degree of adaptive divergence (anagenesis).`},{id:11,unit:`Unit I`,category:`nomenclature-biosystematics`,questionNumber:1,answer:`ICZN`,clues:{A:`I provide an internationally recognized statutory framework for naming animals.`,B:`My provisions ensure stability, universality, and uniqueness of scientific names.`,C:`I regulate the Principle of Priority, name availability, homonymy, and type designation.`,D:`My acronym stands for the International Code of Zoological Nomenclature.`},options:[`ICBN`,`ICZN`,`ICTV`,`IUCN`],correctOption:`ICZN`,explanation:`The ICZN (International Code of Zoological Nomenclature) establishes universal rules governing the scientific naming of animals.`},{id:12,unit:`Unit I`,category:`nomenclature-biosystematics`,questionNumber:2,answer:`Binomial Nomenclature`,clues:{A:`I eliminated confusing, long polynomial descriptive phrases in early natural history.`,B:`I was universally established for animals by Carolus Linnaeus in the 10th edition of Systema Naturae (1758).`,C:`I mandate that every animal species name consists of exactly two Latinized words.`,D:`The first word is the capitalized Genus name and the second is the lowercase specific epithet.`},options:[`Trinomial Nomenclature`,`Binomial Nomenclature`,`Polynomial System`,`Monophyletic System`],correctOption:`Binomial Nomenclature`,explanation:`Binomial nomenclature, founded by Linnaeus, names each biological species with a capitalized genus followed by a specific epithet.`},{id:13,unit:`Unit I`,category:`nomenclature-biosystematics`,questionNumber:3,answer:`Subspecies`,clues:{A:`I am the only formal infraspecific category recognized by the ICZN.`,B:`I represent geographically defined, allopatric populations that differ morphologically from others in the species.`,C:`I am designated scientifically by a third Latinized word, forming a trinomen (e.g., Panthera leo persica).`,D:`When a species contains two or more of me, it is described as a polytypic species.`},options:[`Variety`,`Subspecies`,`Forma`,`Strain`],correctOption:`Subspecies`,explanation:`Subspecies is the only infraspecific rank regulated by the ICZN, designated by trinomial nomenclature to represent distinct geographic races.`},{id:14,unit:`Unit I`,category:`nomenclature-biosystematics`,questionNumber:4,answer:`Dichotomous Key`,clues:{A:`I am a diagnostic identification tool built upon progressive decision-making.`,B:`My structure consists of a series of numbered couplets presenting contrasting character states.`,C:`The investigator chooses between two mutually exclusive alternatives at each step until an identity is reached.`,D:`I appear commonly in indented (yoked) format or bracketed format in taxonomic monographs.`},options:[`Cladogram`,`Dichotomous Key`,`Phenogram`,`Taxonomic Atlas`],correctOption:`Dichotomous Key`,explanation:`A dichotomous key is an identification aid where users choose between pairs of contrasting character statements (couplets).`},{id:15,unit:`Unit I`,category:`nomenclature-biosystematics`,questionNumber:5,answer:`Numerical Taxonomy`,clues:{A:`I arose in the late 1950s with the advent of high-speed electronic computers.`,B:`Pioneered by Peter Sneath and Robert Sokal, I am often called Phenetics.`,C:`I assign equal weight to large numbers of unweighted morphological or biochemical characters.`,D:`I cluster operational taxonomic units (OTUs) based on overall numerical similarity matrices to produce phenograms.`},options:[`Cladistics`,`Numerical Taxonomy`,`Cytotaxonomy`,`Chemotaxonomy`],correctOption:`Numerical Taxonomy`,explanation:`Numerical taxonomy (phenetics), championed by Sokal and Sneath, classifies organisms by calculating mathematical overall similarity across many unweighted traits.`},{id:16,unit:`Unit I`,category:`nomenclature-biosystematics`,questionNumber:6,answer:`Holotype`,clues:{A:`I am a primary type specimen deposited in a recognized scientific museum repository.`,B:`I serve as the permanent, objective standard of reference for a nominal species.`,C:`I fix the application of a specific animal name if taxonomic confusion arises in the future.`,D:`I am the single individual specimen designated or indicated by the original author as the name-bearing type.`},options:[`Paratype`,`Holotype`,`Syntype`,`Neotype`],correctOption:`Holotype`,explanation:`A holotype is the single primary physical specimen designated by the original author to anchor the scientific name of a new species.`},{id:17,unit:`Unit I`,category:`nomenclature-biosystematics`,questionNumber:7,answer:`Biosystematics`,clues:{A:`I am also known as experimental taxonomy, moving beyond dead preserved museum skins.`,B:`I study variation and evolution in living natural populations in field and laboratory conditions.`,C:`I incorporate chromosome cytology, reproductive compatibility, serology, and ecological genetics.`,D:`Camp and Gilly coined my name in 1943 to denote the synthesis of taxonomy, genetics, and ecology.`},options:[`Classical Taxonomy`,`Biosystematics`,`Alpha Taxonomy`,`Typology`],correctOption:`Biosystematics`,explanation:`Biosystematics (experimental taxonomy) investigates living populations using cytogenetics, ecological experiments, and molecular biology.`},{id:18,unit:`Unit I`,category:`nomenclature-biosystematics`,questionNumber:8,answer:`Taxonomic Catalogue`,clues:{A:`I am a specialized taxonomic literature reference format much more comprehensive than a simple checklist.`,B:`I provide an exhaustive bibliographic record of all published names for a given animal group.`,C:`I document complete synonymy, original descriptions, type localities, repository data, and distributions.`,D:`Famous examples include Sherborn's Index Animalium and the Zoological Record.`},options:[`Taxonomic Key`,`Field Guide`,`Taxonomic Catalogue`,`Atlas`],correctOption:`Taxonomic Catalogue`,explanation:`A taxonomic catalogue is a comprehensive bibliographic work listing all recognized taxa of a group along with synonymies, citations, and geographic distributions.`},{id:19,unit:`Unit I`,category:`nomenclature-biosystematics`,questionNumber:9,answer:`Principle of Priority`,clues:{A:`I am a cornerstone canon codified in Article 23 of the International Code of Zoological Nomenclature.`,B:`I determine which of two or more competing scientific names must be officially adopted.`,C:`I dictate that the oldest available valid name published according to ICZN rules takes precedence.`,D:`My baseline starting date is January 1, 1758, the publication of Linnaeus's Systema Naturae 10th edition.`},options:[`Principle of Priority`,`Principle of Typification`,`Principle of Coordination`,`Law of Parsimony`],correctOption:`Principle of Priority`,explanation:`The Principle of Priority mandates that the earliest validly published scientific name for a taxon is the correct name to be used.`},{id:20,unit:`Unit I`,category:`nomenclature-biosystematics`,questionNumber:10,answer:`Neotype`,clues:{A:`I am a secondary type specimen created only under strict exceptional circumstances.`,B:`I can only be designated if the original holotype and all syntypes have been demonstrably lost or destroyed.`,C:`I must come as close as possible to the original type locality and match original descriptions.`,D:`My purpose is to serve as the replacement name-bearing type specimen when clarifying a confused nominal taxon.`},options:[`Lectotype`,`Paratype`,`Neotype`,`Topotype`],correctOption:`Neotype`,explanation:`A neotype is a replacement type specimen designated when the original holotype and all primary type material have been lost or destroyed.`},{id:21,unit:`Unit II`,category:`invertebrate-origins-bodyplans`,questionNumber:1,answer:`Colonial Flagellate Hypothesis`,clues:{A:`I am the most widely accepted classical hypothesis explaining the evolutionary origin of Metazoa.`,B:`Championed historically by Ernst Haeckel and refined by Élie Metchnikoff.`,C:`I propose that multicellular animals arose from spherical hollow colonies of flagellated protozoans.`,D:`Molecular phylogenetics strongly supports me by showing that Choanoflagellates are the closest living relatives of animals.`},options:[`Syncytial Ciliate Hypothesis`,`Colonial Flagellate Hypothesis`,`Polyphyletic Theory`,`Symbiotic Theory`],correctOption:`Colonial Flagellate Hypothesis`,explanation:`The Colonial Flagellate Hypothesis states that metazoans originated from hollow colonies of flagellated protozoans related to modern choanoflagellates.`},{id:22,unit:`Unit II`,category:`invertebrate-origins-bodyplans`,questionNumber:2,answer:`Bilateral Symmetry`,clues:{A:`I revolutionized animal evolution by promoting directed forward locomotion.`,B:`I am intimately linked with cephalization: concentration of sensory organs and nervous tissues at the anterior end.`,C:`My body architecture possesses anterior, posterior, dorsal, and ventral orientations.`,D:`My body can be divided into mirrored left and right halves along only a single sagittal plane.`},options:[`Radial Symmetry`,`Biradial Symmetry`,`Bilateral Symmetry`,`Spherical Symmetry`],correctOption:`Bilateral Symmetry`,explanation:`Bilateral symmetry divides an organism into mirrored left and right halves along a single sagittal plane, driving cephalization and active directional locomotion.`},{id:23,unit:`Unit II`,category:`invertebrate-origins-bodyplans`,questionNumber:3,answer:`Enterocoely`,clues:{A:`I am a major embryological developmental pathway for forming true body cavities.`,B:`I am a defining developmental hallmark of deuterostome coelomates like echinoderms and chordates.`,C:`During my process, mesodermal pouches bud outward from the lateral walls of the archenteron (primitive gut).`,D:`These outpocketing gut pouches pinch off and expand to form the peritoneal coelomic cavities.`},options:[`Schizocoely`,`Enterocoely`,`Pseudocoely`,`Acoely`],correctOption:`Enterocoely`,explanation:`Enterocoely is the coelom formation process where mesodermal pouches bud directly from the archenteron walls, typical of deuterostomes.`},{id:24,unit:`Unit II`,category:`invertebrate-origins-bodyplans`,questionNumber:4,answer:`Schizocoely`,clues:{A:`I am the ancestral embryonic mode of coelom formation characteristic of protostome coelomates.`,B:`I occur prominently during early development in annelids, arthropods, and molluscs.`,C:`I begin with 4d micromere cells migrating into the blastocoel to form solid cordons of mesoderm.`,D:`The true coelomic cavity forms internally when these solid mesodermal blocks split open.`},options:[`Enterocoely`,`Schizocoely`,`Gastrulation`,`Neurulation`],correctOption:`Schizocoely`,explanation:`Schizocoely forms the coelom by the internal splitting of solid mesodermal blocks, characteristic of protostome invertebrates.`},{id:25,unit:`Unit II`,category:`invertebrate-origins-bodyplans`,questionNumber:5,answer:`Pseudocoelom`,clues:{A:`I am a fluid-filled body space found in rotifers, nematodes, and gastrotrichs.`,B:`I act as an efficient hydrostatic skeleton for internal organ suspension and locomotion.`,C:`Embryologically, I represent the persistent embryonic blastocoel rather than a new cavity.`,D:`I am distinguished because I lack a complete cellular mesodermal peritoneum lining my internal walls.`},options:[`Eucoelom`,`Pseudocoelom`,`Haemocoel`,`Archenteron`],correctOption:`Pseudocoelom`,explanation:`A pseudocoelom is a 'false' body cavity derived from the embryonic blastocoel that is not lined by a mesodermal peritoneal epithelium.`},{id:26,unit:`Unit II`,category:`invertebrate-origins-bodyplans`,questionNumber:6,answer:`Metamerism`,clues:{A:`I am a fundamental body plan feature present in Annelida, Arthropoda, and Chordata.`,B:`I provide mechanical efficiency, regional specialization, and localized hydraulic locomotion.`,C:`I am characterized by the linear serial repetition of homologous body organs along the anteroposterior axis.`,D:`In zoology, I am commonly known as true segmentation.`},options:[`Cephalization`,`Metamerism`,`Tagmosis`,`Polymorphism`],correctOption:`Metamerism`,explanation:`Metamerism (true segmentation) is the serial repetition of homologous body parts and organ systems along the longitudinal axis of an animal.`},{id:27,unit:`Unit II`,category:`invertebrate-origins-bodyplans`,questionNumber:7,answer:`Cyclomerism Theory`,clues:{A:`I am an evolutionary hypothesis formulated by Sedgwick (1884) to explain the origin of metameric segmentation.`,B:`I trace the origin of segmentation back to ancestral anthozoan cnidarians.`,C:`I suggest segments arose when radial gastric pouches were serially duplicated along an elongated body.`,D:`I propose that the coelom and segments arose simultaneously from partitioned enterocoelic gut compartments.`},options:[`Corm Theory`,`Pseudometamerism Theory`,`Cyclomerism Theory`,`Locomotion Theory`],correctOption:`Cyclomerism Theory`,explanation:`Sedgwick's Cyclomerism Theory proposes that metamerism and coelomic cavities evolved from the subdivision of gastric pouches in an ancestral anthozoan.`},{id:28,unit:`Unit II`,category:`invertebrate-origins-bodyplans`,questionNumber:8,answer:`Protostomes`,clues:{A:`I am a major lineage of Bilateria comprising Platyhelminthes, Annelida, Mollusca, and Arthropoda.`,B:`My early embryonic cleavage is predominantly spiral and determinate.`,C:`During my gastrulation, the initial embryonic blastopore develops directly into the adult mouth.`,D:`My name literally translates from Greek as 'mouth first'.`},options:[`Deuterostomes`,`Protostomes`,`Radiata`,`Parazoa`],correctOption:`Protostomes`,explanation:`Protostomes ('mouth first') are bilaterian animals where the embryonic blastopore becomes the mouth, typically exhibiting spiral determinate cleavage.`},{id:29,unit:`Unit II`,category:`invertebrate-origins-bodyplans`,questionNumber:9,answer:`Deuterostomes`,clues:{A:`I am the sister clade to Protostomia within the Bilateria.`,B:`My early embryos undergo radial and indeterminate (regulative) cleavage.`,C:`During my gastrulation, the blastopore develops into the anus, while the mouth forms secondarily.`,D:`My living representatives include Echinodermata, Hemichordata, and Chordata.`},options:[`Ecdysozoa`,`Lophotrochozoa`,`Deuterostomes`,`Protostomes`],correctOption:`Deuterostomes`,explanation:`Deuterostomes ('mouth second') develop their anus from or near the blastopore, with the mouth arising secondarily, showing radial indeterminate cleavage.`},{id:30,unit:`Unit II`,category:`invertebrate-origins-bodyplans`,questionNumber:10,answer:`Phylogenetic Tree`,clues:{A:`I am a visual graphical hypothesis of genealogical history and macroevolutionary patterns.`,B:`My internal nodes represent inferred speciation events and common ancestors.`,C:`My terminal branches indicate extant or extinct evolutionary lineages.`,D:`Charles Darwin famously drew a sketch of me in his notebook with the caption 'I think'.`},options:[`Phenogram`,`Phylogenetic Tree`,`Histogram`,`Stratigraphic Column`],correctOption:`Phylogenetic Tree`,explanation:`A phylogenetic tree is a branching diagrammatic hypothesis showing inferred evolutionary relationships and common ancestry among biological taxa.`},{id:31,unit:`Unit II`,category:`arthropod-mollusca-echinoderm`,questionNumber:1,answer:`Trochophore Larva`,clues:{A:`I am a microscopic, free-swimming ciliated pelagic larva.`,B:`My diamond or top-shaped body features an equatorial girdle of cilia called the prototroch.`,C:`I have an apical sensory organ and complete digestive system with blastopore-derived mouth.`,D:`My shared presence provides classic morphological proof uniting Mollusca and Annelida in Lophotrochozoa.`},options:[`Nauplius Larva`,`Trochophore Larva`,`Planula Larva`,`Tornaria Larva`],correctOption:`Trochophore Larva`,explanation:`The trochophore larva is a ciliated, free-swimming planktonic larval stage that phylogenetically links molluscs and annelids.`},{id:32,unit:`Unit II`,category:`arthropod-mollusca-echinoderm`,questionNumber:2,answer:`Bipinnaria Larva`,clues:{A:`I am an early larval stage exclusive to the phylum Echinodermata.`,B:`Unlike my adult form, my body exhibits complete bilateral symmetry.`,C:`I possess a continuous, winding ciliated band running over lateral lobes used for swimming and feeding.`,D:`I am the characteristic free-swimming early larva of sea stars (Asteroidea), followed by the brachiolaria stage.`},options:[`Bipinnaria Larva`,`Pluteus Larva`,`Auricularia Larva`,`Veliger Larva`],correctOption:`Bipinnaria Larva`,explanation:`The bipinnaria is the bilateral, ciliated early larval stage of Asteroidea (sea stars) that subsequently develops into a brachiolaria larva.`},{id:33,unit:`Unit II`,category:`arthropod-mollusca-echinoderm`,questionNumber:3,answer:`Pluteus Larva`,clues:{A:`I am an echinoderm larva with an easel-like or pyramidal appearance.`,B:`My body is supported internally by delicate, calcified skeletal rods.`,C:`I bear elongated, ciliated projecting arms used for suspension feeding.`,D:`I occur in two distinct types: the echinopluteus of sea urchins and the ophiopluteus of brittle stars.`},options:[`Mysis Larva`,`Zoea Larva`,`Pluteus Larva`,`Glochidium Larva`],correctOption:`Pluteus Larva`,explanation:`The pluteus larva possesses long projecting arms supported by calcareous rods, characteristic of Echinoidea and Ophiuroidea.`},{id:34,unit:`Unit II`,category:`arthropod-mollusca-echinoderm`,questionNumber:4,answer:`Dipleurula`,clues:{A:`I am a prominent theoretical concept in echinoderm and deuterostome phylogeny.`,B:`Conceived by Bather in 1900 as the hypothetical bilateral ancestor of all echinoderms.`,C:`My hypothetical body had bilateral symmetry, three pairs of coelomic pouches, and a circumoral ciliated band.`,D:`All modern echinoderm larval types (bipinnaria, auricularia, pluteus) are derived phylogenetically from me.`},options:[`Trochophore`,`Dipleurula`,`Gastrea`,`Planula`],correctOption:`Dipleurula`,explanation:`The Dipleurula is the hypothetical, bilateral ancestor reconstructed to explain the common origin and diverse larval forms of all echinoderms.`},{id:35,unit:`Unit II`,category:`arthropod-mollusca-echinoderm`,questionNumber:5,answer:`Radula`,clues:{A:`I am an anatomical feeding synapomorphy unique to the phylum Mollusca.`,B:`I am supported by a cartilaginous base called an odontophore within the buccal cavity.`,C:`I consist of a flexible chitinous ribbon carrying transverse rows of microscopic recurved teeth.`,D:`I am present in snails, slugs, chitons, and cephalopods, but completely lost in bivalves.`},options:[`Radula`,`Aristotle's Lantern`,`Mandible`,`Chelicera`],correctOption:`Radula`,explanation:`The radula is a minutely toothed, chitinous ribbon found in almost all molluscan classes (except Bivalvia) used for scraping and grazing food.`},{id:36,unit:`Unit II`,category:`arthropod-mollusca-echinoderm`,questionNumber:6,answer:`Torsion`,clues:{A:`I am a dramatic morphogenetic event occurring during the larval development of Gastropoda.`,B:`I am strictly distinct from the spiral coiling of the shell.`,C:`I involve an asymmetrical 180-degree counterclockwise rotation of the visceral mass and mantle cavity.`,D:`As a result of my rotation, the anus, gills, and mantle cavity are repositioned directly above the head.`},options:[`Evisceration`,`Torsion`,`Tagmosis`,`Ecdysis`],correctOption:`Torsion`,explanation:`Torsion is the 180° counterclockwise rotation of the visceral mass during gastropod veliger larval development, bringing the mantle cavity to the anterior.`},{id:37,unit:`Unit II`,category:`arthropod-mollusca-echinoderm`,questionNumber:7,answer:`Ecdysis`,clues:{A:`I am a major physiological milestone in the life history of all arthropods.`,B:`Controlled by the steroid hormone ecdysone secreted under neuroendocrine regulation.`,C:`I am necessary because an inextensible cuticular exoskeleton restricts physical somatic growth.`,D:`I am commonly called moulting, and unite arthropods and nematodes inside the superphylum Ecdysozoa.`},options:[`Metamorphosis`,`Ecdysis`,`Autotomy`,`Epimorphosis`],correctOption:`Ecdysis`,explanation:`Ecdysis (moulting) is the periodic shedding of the cuticular exoskeleton, defining the monophyletic superphylum Ecdysozoa.`},{id:38,unit:`Unit II`,category:`arthropod-mollusca-echinoderm`,questionNumber:8,answer:`Tagmosis`,clues:{A:`I am a key evolutionary hallmark responsible for the spectacular adaptive radiation of Arthropoda.`,B:`I modify primitive homonomous metameric segments into specialized functional regions.`,C:`Through fusion and structural differentiation, I produce tagmata such as head, thorax, and abdomen.`,D:`In chelicerates and decapod crustaceans, I produce a unified cephalothorax (prosoma).`},options:[`Metamerism`,`Tagmosis`,`Polymorphism`,`Strobilation`],correctOption:`Tagmosis`,explanation:`Tagmosis is the evolutionary fusion and functional specialization of adjacent body segments into distinct tagmata (head, thorax, abdomen).`},{id:39,unit:`Unit II`,category:`arthropod-mollusca-echinoderm`,questionNumber:9,answer:`Water Vascular System`,clues:{A:`I am an organ system without counterpart in any other animal phylum on Earth.`,B:`Embryologically, I develop directly from coelomic compartments (the hydrocoel).`,C:`I operate through hydrostatic fluid pressure regulated by a sieve-like madreporite and stone canal.`,D:`I branch into radial canals and thousands of muscular tube feet (podia) for locomotion, food handling, and gas exchange.`},options:[`Haemal System`,`Water Vascular System`,`Protonephridial System`,`Tracheal System`],correctOption:`Water Vascular System`,explanation:`The water vascular (ambulacral) system is a coelom-derived hydraulic network unique to echinoderms, operating tube feet for locomotion and respiration.`},{id:40,unit:`Unit II`,category:`arthropod-mollusca-echinoderm`,questionNumber:10,answer:`Veliger Larva`,clues:{A:`I am a specialized planktonic larva characteristic of marine gastropods and bivalves.`,B:`I develop ontogenetically from an earlier trochophore stage.`,C:`I possess a rudimentary coiled shell, foot, and operculum.`,D:`My most conspicuous feature is a pair of large, ciliated swimming lobes called the velum.`},options:[`Veliger Larva`,`Glochidium Larva`,`Zoea Larva`,`Megalopa Larva`],correctOption:`Veliger Larva`,explanation:`The veliger is the characteristic larval stage of marine gastropods and bivalves, distinguished by ciliated velar lobes used for swimming and feeding.`},{id:41,unit:`Unit III`,category:`chordate-origins-fish-evolution`,questionNumber:1,answer:`Garstang's Hypothesis`,clues:{A:`I am an influential 20th-century evolutionary theory proposed by Walter Garstang in 1928.`,B:`I reject an annelid or arthropod ancestry for chordates, focusing instead on deuterostome larvae.`,C:`I suggest chordates arose when ciliated echinoderm larvae failed to metamorphose and became sexually mature.`,D:`I invoke the macroevolutionary process of paedomorphosis (neoteny) from an auricularia-like ancestor.`},options:[`Gaskell's Annelid Theory`,`Garstang's Hypothesis`,`Balfour's Coelom Theory`,`Geoffroy's Inversion Theory`],correctOption:`Garstang's Hypothesis`,explanation:`Garstang's hypothesis suggests that the ancestral chordate body plan evolved via paedomorphosis (neoteny) from bilateral, ciliated echinoderm larvae.`},{id:42,unit:`Unit III`,category:`chordate-origins-fish-evolution`,questionNumber:2,answer:`Ostracoderms`,clues:{A:`We are an extinct paraphyletic assemblage of primitive fish-like vertebrates.`,B:`We flourished in freshwater and marine environments of the Ordovician, Silurian, and Devonian periods.`,C:`We completely lacked true jaws and pelvic fins, moving via a heterocercal tail.`,D:`Our heads and bodies were encased in heavy, bony dermal armor plates, giving us the moniker 'shell-skinned'.`},options:[`Placoderms`,`Ostracoderms`,`Acanthodians`,`Teleosts`],correctOption:`Ostracoderms`,explanation:`Ostracoderms ('shell-skinned') are the earliest known jawless armored fossil vertebrates (agnathans), flourishing from the Ordovician to Devonian.`},{id:43,unit:`Unit III`,category:`chordate-origins-fish-evolution`,questionNumber:3,answer:`Placoderms`,clues:{A:`We represent a monumental breakthrough in vertebrate predatory evolution.`,B:`We were the first vertebrates to possess true movable biting jaws derived from mandibular arches.`,C:`Our head and thoracic regions were covered in heavy dermal bony shields with a distinctive neck hinge.`,D:`Giant apex Devonian predators like the 9-meter Dunkleosteus belong to our extinct class.`},options:[`Ostracoderms`,`Placoderms`,`Chondrichthyes`,`Cyclostomes`],correctOption:`Placoderms`,explanation:`Placoderms ('plate-skinned') were the earliest gnathostome (jawed) fishes, featuring heavy dermal armor plates and movable jaws, exemplified by Dunkleosteus.`},{id:44,unit:`Unit III`,category:`chordate-origins-fish-evolution`,questionNumber:4,answer:`Acanthodii`,clues:{A:`We are an extinct group of early jawed fishes often referred to as 'spiny sharks'.`,B:`We appeared in the Silurian and died out in the Permian.`,C:`We had small diamond-shaped scales, large eyes, and multiple pairs of intermediate ventrolateral fins.`,D:`Our defining diagnostic trait was a series of stout, prominent bony spines supporting every fin except the caudal.`},options:[`Placoderms`,`Acanthodii`,`Osteostraci`,`Anaspida`],correctOption:`Acanthodii`,explanation:`Acanthodians ('spiny sharks') were early Paleozoic gnathostomes characterized by stout bony spines supporting all fins and multiple intermediate paired fins.`},{id:45,unit:`Unit III`,category:`chordate-origins-fish-evolution`,questionNumber:5,answer:`Notochord`,clues:{A:`I am the defining primary endoskeletal structure that gives Phylum Chordata its scientific name.`,B:`I originate embryologically from the chordamesoderm beneath the dorsal nerve cord.`,C:`I consist of a flexible, turgid rod of fluid-filled vacuolated cells enclosed in a fibrous sheath.`,D:`In adult vertebrates, I am largely or entirely replaced by the cartilaginous or bony vertebral column.`},options:[`Spinal Cord`,`Notochord`,`Endostyle`,`Vertebral Arch`],correctOption:`Notochord`,explanation:`The notochord is a flexible, dorsal rod of vacuolated cells serving as the primary axial skeletal support in all chordate embryos.`},{id:46,unit:`Unit III`,category:`chordate-origins-fish-evolution`,questionNumber:6,answer:`Branchiostoma`,clues:{A:`I am a classic model organism in vertebrate evolutionary embryology.`,B:`I am a translucent, fish-like marine burrower belonging to Subphylum Cephalochordata.`,C:`Also commonly known by my historical genus name, Amphioxus (the lancelet).`,D:`I retain all five primary chordate hallmarks (notochord, nerve cord, pharyngeal slits, endostyle, post-anal tail) in full adulthood.`},options:[`Branchiostoma`,`Petromyzon`,`Balanoglossus`,`Ascidia`],correctOption:`Branchiostoma`,explanation:`Branchiostoma (Amphioxus / lancelet) is a cephalochordate that retains the notochord, dorsal hollow nerve cord, pharyngeal slits, and endostyle throughout life.`},{id:47,unit:`Unit III`,category:`chordate-origins-fish-evolution`,questionNumber:7,answer:`Tornaria Larva`,clues:{A:`I am a planktonic marine larva belonging to the enteropneust hemichordates (acorn worms).`,B:`Johannes Müller discovered me in 1850 and initially misclassified me as an echinoderm larva.`,C:`My transparent oval body features a complex loop of ciliated bands and an apical sensory tuft.`,D:`My striking morphological resemblance to the echinoderm bipinnaria larva provides key evidence of chordate-echinoderm affinities.`},options:[`Müller's Larva`,`Tornaria Larva`,`Actinotrocha Larva`,`Pilidium Larva`],correctOption:`Tornaria Larva`,explanation:`The tornaria larva of enteropneust hemichordates closely resembles echinoderm bipinnaria larvae, demonstrating deuterostome interrelationships.`},{id:48,unit:`Unit III`,category:`chordate-origins-fish-evolution`,questionNumber:8,answer:`Sarcopterygii`,clues:{A:`We are a major osteichthyan class commonly known as the lobe-finned fishes.`,B:`Unlike ray-finned fishes, our paired fins are borne on fleshy, muscular lobes with an internal skeletal axis.`,C:`Our living members include the coelacanth (Latimeria) and three genera of lungfishes (Dipnoi).`,D:`The internal bones of our pectoral fins (humerus, radius, ulna) are homologous to the tetrapod forelimb.`},options:[`Actinopterygii`,`Sarcopterygii`,`Chondrichthyes`,`Acanthodii`],correctOption:`Sarcopterygii`,explanation:`Sarcopterygii (lobe-finned fishes) possess fleshy paired fins supported by internal bony elements that gave rise to terrestrial tetrapod limbs.`},{id:49,unit:`Unit III`,category:`chordate-origins-fish-evolution`,questionNumber:9,answer:`Tiktaalik`,clues:{A:`I am an iconic transitional fossil discovered in 2004 on Ellesmere Island in Arctic Canada.`,B:`I lived during the Late Devonian period, approximately 375 million years ago.`,C:`I possess fish traits (scales, fin rays, gills) alongside tetrapod traits (neck, ribs, flat skull, wrist bones).`,D:`Popularly celebrated as the premier 'fishapod' bridging the evolutionary gap between lobe-finned fish and early tetrapods.`},options:[`Archaeopteryx`,`Tiktaalik`,`Eusthenopteron`,`Ichthyostega`],correctOption:`Tiktaalik`,explanation:`Tiktaalik roseae is a Late Devonian 'fishapod' displaying intermediate morphology between sarcopterygian fishes (Panderichthys) and stem tetrapods (Acanthostega).`},{id:50,unit:`Unit III`,category:`chordate-origins-fish-evolution`,questionNumber:10,answer:`Endostyle`,clues:{A:`I am one of the fundamental diagnostic anatomical hallmarks of the Phylum Chordata.`,B:`I am situated along the ventral floor of the pharynx in tunicates, cephalochordates, and larval lampreys.`,C:`I secrete a continuous ribbon of mucus used to trap suspended food particles drawn through the gill slits.`,D:`My iodinated protein-binding cells are directly homologous to the thyroid gland of adult vertebrates.`},options:[`Epithalamus`,`Endostyle`,`Hatschek's Pit`,`Glomus`],correctOption:`Endostyle`,explanation:`The endostyle is a ventral ciliated groove in the pharynx of prochordates and ammocoete larvae that concentrates iodine and evolved into the vertebrate thyroid gland.`},{id:51,unit:`Unit III`,category:`tetrapod-vertebrate-evolution`,questionNumber:1,answer:`Acanthostega`,clues:{A:`I am one of the most famous stem tetrapods of the Late Devonian period from Greenland.`,B:`I proved that limbs with digits originally evolved for underwater crawling before animals conquered dry land.`,C:`I retained internal fish-like gills, a caudal fin, and lateral line canals.`,D:`My paddle-like limbs famously bore eight digits on each foot rather than the modern pentadactyl count.`},options:[`Acanthostega`,`Seymouria`,`Dimetrodon`,`Hylonomus`],correctOption:`Acanthostega`,explanation:`Acanthostega is a Late Devonian stem tetrapod with eight digits per limb, retaining internal gills and illustrating that limbs evolved in aquatic habitats.`},{id:52,unit:`Unit III`,category:`tetrapod-vertebrate-evolution`,questionNumber:2,answer:`Amniotic Egg`,clues:{A:`I am the definitive evolutionary breakthrough that emancipated vertebrates from dependence on water for breeding.`,B:`My external porous shell protects against desiccation while allowing gas exchange.`,C:`I contain four specialized extraembryonic membranes: yolk sac, amnion, chorion, and allantois.`,D:`My advent during the Carboniferous period gave rise to the clade Amniota (reptiles, birds, mammals).`},options:[`Cleidoic Shell`,`Amniotic Egg`,`Placental Sac`,`Blastocyst`],correctOption:`Amniotic Egg`,explanation:`The amniotic egg, equipped with amnion, chorion, allantois, and yolk sac, allowed terrestrial reproduction without returning to aquatic environments.`},{id:53,unit:`Unit III`,category:`tetrapod-vertebrate-evolution`,questionNumber:3,answer:`Synapsida`,clues:{A:`We are a primary lineage of amniotes that diverged during the Pennsylvanian subperiod.`,B:`Our skull architecture is characterized by a single lower temporal opening behind each eye orbit.`,C:`Our early members included sail-backed pelycosaurs like Dimetrodon, followed by advanced therapsids.`,D:`We gave rise directly to the true mammals, making our lineage the mammalian ancestral stem.`},options:[`Diapsida`,`Anapsida`,`Synapsida`,`Euryapsida`],correctOption:`Synapsida`,explanation:`Synapsida is the amniote lineage possessing a single temporal fenestra, encompassing pelycosaurs, therapsids, and modern mammals.`},{id:54,unit:`Unit III`,category:`tetrapod-vertebrate-evolution`,questionNumber:4,answer:`Diapsida`,clues:{A:`We are the extraordinarily diverse amniote lineage characterized by two temporal fenestrae in the skull.`,B:`Our skull features both a superior and an inferior temporal opening separated by a postorbital-squamosal bar.`,C:`Our major divisions include Lepidosauromorpha (lizards, snakes, tuatara) and Archosauromorpha.`,D:`Our archosaur branch gave rise to crocodilians, pterosaurs, dinosaurs, and modern birds.`},options:[`Synapsida`,`Diapsida`,`Anapsida`,`Parareptilia`],correctOption:`Diapsida`,explanation:`Diapsida is the reptilian clade characterized by two temporal openings in the skull, including lizards, snakes, crocodilians, dinosaurs, and birds.`},{id:55,unit:`Unit III`,category:`tetrapod-vertebrate-evolution`,questionNumber:5,answer:`Therapsida`,clues:{A:`We are the advanced synapsid order that dominated terrestrial ecosystems in the Permian and Triassic.`,B:`Our limbs rotated beneath the body into an erect, upright posture instead of a sprawling gait.`,C:`We evolved heterodont dentition (incisors, canines, molars) and a secondary bony palate.`,D:`Our cynodont subgroup developed endothermy, hair, and ultimately gave origin to the first true mammals.`},options:[`Pelycosauria`,`Therapsida`,`Cotylosauria`,`Plesiosauria`],correctOption:`Therapsida`,explanation:`Therapsida ('beast-face') were advanced mammal-like synapsids with upright posture, heterodont teeth, and secondary palate, leading to cynodonts and mammals.`},{id:56,unit:`Unit III`,category:`tetrapod-vertebrate-evolution`,questionNumber:6,answer:`Prototheria`,clues:{A:`I am the most basal of the three mammalian subclasses recognized in mammalian systematics.`,B:`My living representatives are confined entirely to the Australasian biogeographic realm.`,C:`We lack nipples, secreting milk onto abdominal skin patches, and possess a cloaca.`,D:`We are the oviparous (egg-laying) mammals comprising the Order Monotremata (platypus and echidnas).`},options:[`Metatheria`,`Eutheria`,`Prototheria`,`Allotheria`],correctOption:`Prototheria`,explanation:`Subclass Prototheria (monotremes) contains the egg-laying mammals (platypus and echidnas) possessing a cloaca and lacking nipples.`},{id:57,unit:`Unit III`,category:`tetrapod-vertebrate-evolution`,questionNumber:7,answer:`Metatheria`,clues:{A:`We are one of the three mammalian subclasses, also known as the marsupials.`,B:`We have an epipubic bone and a bifurcated reproductive tract with short intrauterine gestation.`,C:`Our altricial young are born in an embryonic state and crawl unaided into a maternal pouch.`,D:`We diversified extensively in Australia and South America, exemplified by kangaroos, koalas, and opossums.`},options:[`Prototheria`,`Metatheria`,`Eutheria`,`Monotremata`],correctOption:`Metatheria`,explanation:`Subclass Metatheria (marsupials) gives birth to tiny altricial young that complete development nursing inside an external abdominal pouch (marsupium).`},{id:58,unit:`Unit III`,category:`tetrapod-vertebrate-evolution`,questionNumber:8,answer:`Eutheria`,clues:{A:`We are the most diverse and widespread subclass of mammals, comprising over 90% of living mammalian species.`,B:`We lack epipubic bones, allowing expansion of the abdomen during prolonged internal pregnancy.`,C:`Our embryos are nourished in utero via a highly vascular chorioallantoic placenta.`,D:`We give birth to anatomically advanced young, spanning rodents, bats, cetaceans, ungulates, and primates.`},options:[`Metatheria`,`Prototheria`,`Eutheria`,`Multituberculata`],correctOption:`Eutheria`,explanation:`Subclass Eutheria (placental mammals) is characterized by prolonged gestation facilitated by a complex chorioallantoic placenta.`},{id:59,unit:`Unit III`,category:`tetrapod-vertebrate-evolution`,questionNumber:9,answer:`Archaeopteryx`,clues:{A:`I was discovered in 1861 in the Solnhofen limestone of Bavaria, Germany.`,B:`I lived during the Late Jurassic period, approximately 150 million years ago.`,C:`I possess reptilian features: jaw with teeth, three clawed wing fingers, and a long bony tail.`,D:`I possess avian features: asymmetric flight feathers, wishbone (furcula), and wings, proving birds evolved from theropod dinosaurs.`},options:[`Hesperornis`,`Ichthyornis`,`Archaeopteryx`,`Confuciusornis`],correctOption:`Archaeopteryx`,explanation:`Archaeopteryx is the iconic Late Jurassic transitional fossil linking coelurosaurian theropod dinosaurs to modern avians.`},{id:60,unit:`Unit III`,category:`tetrapod-vertebrate-evolution`,questionNumber:10,answer:`Labyrinthodontia`,clues:{A:`We are an extinct subclass of primitive Paleozoic amphibians that flourished in Carboniferous swamps.`,B:`We were the dominant predators of early freshwater and terrestrial landscapes.`,C:`Our skull roofs were heavily armored with solid dermal bones like ancestral rhipidistian fishes.`,D:`Our name is derived from the complex, intricately folded labyrinthine enamel pattern of our conical teeth.`},options:[`Labyrinthodontia`,`Lissamphibia`,`Anura`,`Gymnophiona`],correctOption:`Labyrinthodontia`,explanation:`Labyrinthodonts were primitive Paleozoic amphibians named for the complex internal folding (labyrinth) of their tooth enamel, ancestral to all land vertebrates.`},{id:61,unit:`Unit IV`,category:`geological-time-concepts`,questionNumber:1,answer:`Eon`,clues:{A:`I represent the highest, broadest tier in the formal geochronologic hierarchy.`,B:`Earth's 4.54-billion-year history is divided into only four of me.`,C:`The Hadean, Archean, Proterozoic, and Phanerozoic are my four member divisions.`,D:`I am composed of multiple eras and span hundreds of millions to billions of years.`},options:[`Era`,`Period`,`Eon`,`Epoch`],correctOption:`Eon`,explanation:`An Eon is the largest formal geochronological unit of geological time (e.g., the Phanerozoic Eon).`},{id:62,unit:`Unit IV`,category:`geological-time-concepts`,questionNumber:2,answer:`Era`,clues:{A:`I am the second-largest major subdivision of geological time, ranking directly beneath an Eon.`,B:`My boundaries are typically demarcated by profound global mass extinctions and biotic turnover.`,C:`The Phanerozoic Eon is partitioned into three of me: Paleozoic ('ancient life'), Mesozoic ('middle life'), and Cenozoic ('recent life').`,D:`I am formally subdivided into several geological Periods.`},options:[`Epoch`,`Age`,`Era`,`Chrone`],correctOption:`Era`,explanation:`An Era is a major division of geological time subordinated to an Eon and divided into Periods (e.g., Paleozoic, Mesozoic, Cenozoic).`},{id:63,unit:`Unit IV`,category:`geological-time-concepts`,questionNumber:3,answer:`Period`,clues:{A:`I am the fundamental and most commonly cited standard unit of the geological timescale.`,B:`My chronostratigraphic equivalent in rock layers is termed a 'System'.`,C:`Examples of me include Cambrian, Devonian, Carboniferous, Jurassic, and Cretaceous.`,D:`I rank between an Era and an Epoch in the geological time hierarchy.`},options:[`Epoch`,`Period`,`Eon`,`Stage`],correctOption:`Period`,explanation:`A geological Period is the fundamental standard unit of geological time, subdivisions of eras and composed of epochs.`},{id:64,unit:`Unit IV`,category:`geological-time-concepts`,questionNumber:4,answer:`Epoch`,clues:{A:`I rank directly below a Period and above an Age in geochronology.`,B:`My chronostratigraphic rock equivalent is designated as a 'Series'.`,C:`The Cenozoic periods (Paleogene, Neogene, Quaternary) are traditionally divided into seven of me.`,D:`Famous examples include the Paleocene, Eocene, Miocene, Pleistocene, and Holocene.`},options:[`Era`,`Age`,`Epoch`,`Eon`],correctOption:`Epoch`,explanation:`An Epoch is a subdivision of a geological period (e.g., Pleistocene Epoch of the Quaternary Period).`},{id:65,unit:`Unit IV`,category:`geological-time-concepts`,questionNumber:5,answer:`Age`,clues:{A:`I am the shortest, finest standard formal geochronologic time interval in the geological timescale.`,B:`My chronostratigraphic rock layer equivalent is termed a 'Stage'.`,C:`I typically span intervals of a few hundred thousand to a few million years.`,D:`I represent a subdivision of an Epoch, defined by precise fossil biozones (e.g., Maastrichtian Age).`},options:[`Period`,`Era`,`Age`,`Zone`],correctOption:`Age`,explanation:`An Age is the smallest formal geochronologic interval, a subdivision of an epoch corresponding to a stratigraphic stage.`},{id:66,unit:`Unit IV`,category:`geological-time-concepts`,questionNumber:6,answer:`Index Fossil`,clues:{A:`I am an indispensable tool used by geologists and paleontologists for biostratigraphy.`,B:`I allow geologists to correlate and date rock strata across continents.`,C:`I must belong to an organism that was geographically widespread, easily identifiable, and abundant.`,D:`My most critical feature is that my species existed for only a very narrow, short geological time span.`},options:[`Trace Fossil`,`Index Fossil`,`Living Fossil`,`Coprolite`],correctOption:`Index Fossil`,explanation:`An index fossil is a fossil from a widely distributed, easily recognized organism that existed for a short, well-defined geological duration, ideal for dating strata.`},{id:67,unit:`Unit IV`,category:`geological-time-concepts`,questionNumber:7,answer:`Stratigraphy`,clues:{A:`I am the foundational geological discipline that reads the book of Earth history recorded in stone.`,B:`Formulated originally by Nicolaus Steno with principles like original horizontality and lateral continuity.`,C:`I rely centrally on the Law of Superposition: in undisturbed sedimentary rocks, older layers lie beneath younger layers.`,D:`I study the description, composition, fossil content, and relative ages of layered rock strata.`},options:[`Petrology`,`Stratigraphy`,`Mineralogy`,`Geomorphology`],correctOption:`Stratigraphy`,explanation:`Stratigraphy is the branch of geology concerned with the order, relative age, and correlation of rock strata according to the Law of Superposition.`},{id:68,unit:`Unit IV`,category:`geological-time-concepts`,questionNumber:8,answer:`Radiometric Dating`,clues:{A:`I revolutionized 20th-century geology by providing absolute numerical calendar ages in millions of years.`,B:`I do not rely on relative fossil comparisons, but on nuclear physics inside igneous and metamorphic minerals.`,C:`I measure the constant, unalterable half-life decay of unstable radioactive parent isotopes into stable daughter atoms.`,D:`Common systems include Potassium-Argon, Uranium-Lead, and Carbon-14.`},options:[`Relative Dating`,`Radiometric Dating`,`Biostratigraphy`,`Magnetostratigraphy`],correctOption:`Radiometric Dating`,explanation:`Radiometric dating measures the decay of radioactive isotopes at known half-life rates to calculate the absolute chronological age of rocks and fossils.`},{id:69,unit:`Unit IV`,category:`geological-time-concepts`,questionNumber:9,answer:`Precambrian`,clues:{A:`I am an informal mega-interval representing the vast majority of Earth's planetary existence.`,B:`I encompass approximately 88% of all geological time, spanning from 4.54 billion to 541 million years ago.`,C:`I comprise the Hadean, Archean, and Proterozoic eons prior to the explosion of shelled macroscopic life.`,D:`I ended at the base of the Cambrian period with the appearance of complex multicellular skeletal faunas.`},options:[`Phanerozoic`,`Precambrian`,`Paleozoic`,`Mesozoic`],correctOption:`Precambrian`,explanation:`The Precambrian is the informal super-eon spanning ~88% of Earth's history prior to the Cambrian Period (~541 Ma).`},{id:70,unit:`Unit IV`,category:`geological-time-concepts`,questionNumber:10,answer:`Phanerozoic Eon`,clues:{A:`My name is derived from Greek words meaning 'visible or manifest life'.`,B:`I encompass the most recent 541 million years of Earth history.`,C:`I am characterized by the dramatic diversification of animals with mineralized shells, carapaces, and skeletons.`,D:`I am partitioned into the Paleozoic, Mesozoic, and Cenozoic Eras, extending to the present day.`},options:[`Proterozoic Eon`,`Phanerozoic Eon`,`Archean Eon`,`Hadean Eon`],correctOption:`Phanerozoic Eon`,explanation:`The Phanerozoic Eon ('visible life') is the current geological eon beginning 541 million years ago, characterized by abundant fossilized multicellular organisms.`},{id:71,unit:`Unit IV`,category:`geological-succession-animals`,questionNumber:1,answer:`Cambrian Explosion`,clues:{A:`I am the most famous geologically rapid macroevolutionary radiation event in Earth history.`,B:`I occurred approximately 541 to 520 million years ago in warm shallow epicontinental seas.`,C:`During my brief window, virtually all modern animal phyla developed hard skeletal mineralized body plans.`,D:`The Burgess Shale and Chengjiang fossil beds provide breathtaking snapshots of my bizarre animal diversity.`},options:[`Great Oxidation Event`,`Cambrian Explosion`,`Devonian Radiation`,`Avalon Explosion`],correctOption:`Cambrian Explosion`,explanation:`The Cambrian Explosion (~541 Ma) was a rapid evolutionary radiation where nearly all major modern bilaterian animal phyla appeared in the fossil record.`},{id:72,unit:`Unit IV`,category:`geological-succession-animals`,questionNumber:2,answer:`Devonian Period`,clues:{A:`I am a major Paleozoic period lasting from 419 to 359 million years ago.`,B:`I witnessed the explosive diversification of agnathans, placoderms, sharks, and bony fishes.`,C:`Sarcopterygian fishes gave rise to the first stem tetrapods walking near shorelines during my late stages.`,D:`Because of my extraordinary aquatic radiation, I am universally crowned the 'Age of Fishes'.`},options:[`Silurian Period`,`Devonian Period`,`Carboniferous Period`,`Permian Period`],correctOption:`Devonian Period`,explanation:`The Devonian Period is famously known as the 'Age of Fishes' due to the remarkable radiation of placoderms, sarcopterygians, and chondrichthyans.`},{id:73,unit:`Unit IV`,category:`geological-succession-animals`,questionNumber:3,answer:`Carboniferous Period`,clues:{A:`I am a Paleozoic period lasting from 359 to 299 million years ago, famous for vast swamp forests.`,B:`Atmospheric oxygen levels spiked to an unprecedented ~35%, fueling gigantism in terrestrial arthropods.`,C:`Representative animals included giant griffinflies (Meganeura), 2-meter millipedes (Arthropleura), and early labyrinthodont amphibians.`,D:`I saw the revolutionary evolutionary origin of the amniotic egg, spawning the first true reptiles.`},options:[`Devonian Period`,`Carboniferous Period`,`Permian Period`,`Triassic Period`],correctOption:`Carboniferous Period`,explanation:`The Carboniferous Period saw extensive coal swamps, high atmospheric oxygen supporting giant arthropods, amphibian radiation, and the origin of amniotes.`},{id:74,unit:`Unit IV`,category:`geological-succession-animals`,questionNumber:4,answer:`Permian-Triassic Extinction`,clues:{A:`I represent the most cataclysmic biological crisis in the entire 4.5-billion-year history of Earth.`,B:`Occurred approximately 252 million years ago at the boundary between the Paleozoic and Mesozoic Eras.`,C:`Triggered by catastrophic massive volcanism in the Siberian Traps causing hyperthermal oceans and anoxia.`,D:`Colloquially known as 'The Great Dying', I wiped out an estimated 96% of all marine species and 70% of terrestrial vertebrate families.`},options:[`K-Pg Extinction`,`Late Devonian Extinction`,`Permian-Triassic Extinction`,`Ordovician-Silurian Extinction`],correctOption:`Permian-Triassic Extinction`,explanation:`The Permian-Triassic extinction event (~252 Ma), or 'The Great Dying', was Earth's most severe extinction, eliminating ~96% of marine species.`},{id:75,unit:`Unit IV`,category:`geological-succession-animals`,questionNumber:5,answer:`Mesozoic Era`,clues:{A:`I am the intermediate geological era of the Phanerozoic Eon, lasting from 252 to 66 million years ago.`,B:`I am partitioned into three famous periods: Triassic, Jurassic, and Cretaceous.`,C:`My ecosystems were dominated globally on land by dinosaurs, in the air by pterosaurs, and in the seas by ichthyosaurs and plesiosaurs.`,D:`I am universally celebrated in biological science as the glorious 'Age of Reptiles'.`},options:[`Paleozoic Era`,`Cenozoic Era`,`Mesozoic Era`,`Proterozoic Era`],correctOption:`Mesozoic Era`,explanation:`The Mesozoic Era ('Age of Reptiles'), spanning Triassic through Cretaceous, was characterized by the dominance of non-avian dinosaurs and giant marine reptiles.`},{id:76,unit:`Unit IV`,category:`geological-succession-animals`,questionNumber:6,answer:`K-Pg Extinction`,clues:{A:`I ended the Mesozoic Era exactly 66 million years ago.`,B:`Caused by the impact of a 10-kilometer asteroid at the Chicxulub crater on the Yucatán Peninsula.`,C:`I produced global wildfires, acid rain, and an impact winter that collapsed worldwide photosynthetic food webs.`,D:`I famously wiped out the ammonites, pterosaurs, and all non-avian dinosaurs, clearing ecological niches for mammalian radiation.`},options:[`Permian Extinction`,`K-Pg Extinction`,`Triassic Extinction`,`Ordovician Extinction`],correctOption:`K-Pg Extinction`,explanation:`The Cretaceous-Paleogene (K-Pg) extinction event (66 Ma), caused by the Chicxulub asteroid impact, terminated the non-avian dinosaurs and opened niches for mammals.`},{id:77,unit:`Unit IV`,category:`geological-succession-animals`,questionNumber:7,answer:`Cenozoic Era`,clues:{A:`I am the current and ongoing geological era, beginning 66 million years ago after the K-Pg boundary.`,B:`My periods are the Paleogene, Neogene, and Quaternary.`,C:`With dinosaurs gone, birds and warm-blooded furred vertebrates underwent dramatic adaptive radiation.`,D:`I am popularly referred to as the 'Age of Mammals'.`},options:[`Mesozoic Era`,`Cenozoic Era`,`Paleozoic Era`,`Neoproterozoic Era`],correctOption:`Cenozoic Era`,explanation:`The Cenozoic Era ('Age of Mammals'), spanning 66 million years ago to the present, is marked by the explosive adaptive radiation of mammals and angiosperms.`},{id:78,unit:`Unit IV`,category:`geological-succession-animals`,questionNumber:8,answer:`Pleistocene Megafauna`,clues:{A:`We are an impressive guild of giant animals that dominated the globe during the Quaternary Ice Ages.`,B:`Our bodies exhibited extreme morphological cold-weather adaptations: massive body mass, dense fur, and thick fat reserves.`,C:`Representative members include the Woolly Mammoth, Woolly Rhino, Saber-toothed Cat (Smilodon), and Giant Ground Sloth.`,D:`Most of us went extinct near the transition to the Holocene (~11,700 years ago) due to climate warming and human overkill.`},options:[`Burgess Shale Fauna`,`Pleistocene Megafauna`,`Ediacaran Biota`,`Pelycosaurs`],correctOption:`Pleistocene Megafauna`,explanation:`The Pleistocene Megafauna were large-bodied, cold-adapted mammals (mammoths, sabertooths, giant sloths) that flourished during Ice Age glaciations.`},{id:79,unit:`Unit IV`,category:`geological-succession-animals`,questionNumber:9,answer:`Burgess Shale`,clues:{A:`I am a UNESCO World Heritage fossil lagerstätte discovered in 1909 by Charles Doolittle Walcott.`,B:`Located in the Canadian Rocky Mountains of British Columbia, dating to the Middle Cambrian (~508 Ma).`,C:`I am world-renowned for the exceptional soft-tissue preservation of early marine invertebrates.`,D:`Iconic bizarre animals unearthed from my dark shale include Anomalocaris, Opabinia, Hallucigenia, and Pikaia.`},options:[`Solnhofen Limestone`,`Burgess Shale`,`La Brea Tar Pits`,`Green River Formation`],correctOption:`Burgess Shale`,explanation:`The Burgess Shale is a celebrated Middle Cambrian Canadian fossil locality preserving exquisite soft-tissue anatomy of early Cambrian animals like Anomalocaris.`},{id:80,unit:`Unit IV`,category:`geological-succession-animals`,questionNumber:10,answer:`Ediacaran Biota`,clues:{A:`We are the oldest known complex macroscopic multicellular communities in Earth's fossil record.`,B:`We flourished in shallow seas at the end of the Proterozoic Eon, between 575 and 541 million years ago.`,C:`We had soft, quilted, frond-like or disc-like sheet bodies lacking hard mineralized shells or jaws.`,D:`Named after the Ediacara Hills of South Australia, our famous representatives include Dickinsonia and Charnia.`},options:[`Burgess Fauna`,`Ediacaran Biota`,`Tommotian Fauna`,`Mammutidae`],correctOption:`Ediacaran Biota`,explanation:`The Ediacaran Biota (~575–541 Ma) represents the earliest known macroscopic multicellular organisms, characterized by soft-bodied, quilted, frond-like forms.`},{id:81,unit:`Unit V`,category:`minor-phyla-1`,questionNumber:1,answer:`Rotifera`,clues:{A:`We are a phylum of microscopic, pseudocoelomate, primarily freshwater invertebrates.`,B:`We possess a syncytial epidermis, bilateral symmetry, eutely, and often a protective cuticular lorica.`,C:`Our anterior end bears a specialized ciliated crown called the corona whose beating resembles a revolving cogwheel.`,D:`Antony van Leeuwenhoek discovered us in 1702, popularizing our common name: 'wheel animalcules'.`},options:[`Gastrotricha`,`Rotifera`,`Kinorhyncha`,`Nematoda`],correctOption:`Rotifera`,explanation:`Rotifera ('wheel animalcules') are microscopic pseudocoelomate animals bearing an anterior ciliated corona and a grinding pharynx (mastax).`},{id:82,unit:`Unit V`,category:`minor-phyla-1`,questionNumber:2,answer:`Mastax`,clues:{A:`I am an internal anatomical structure unique to the Phylum Rotifera.`,B:`I am a modified, muscular pharynx located directly behind the ciliated mouth.`,C:`My interior contains complex, hardened chitinous jaw-like elements called trophi.`,D:`I perform the mechanical mastication, crushing, and grinding of ingested food particles.`},options:[`Prototroch`,`Mastax`,`Radula`,`Introvert`],correctOption:`Mastax`,explanation:`The mastax is the muscular, jaw-bearing pharynx unique to rotifers, containing chitinous masticatory pieces called trophi.`},{id:83,unit:`Unit V`,category:`minor-phyla-1`,questionNumber:3,answer:`Acanthocephala`,clues:{A:`We are an entire phylum of specialized obligate endoparasitic pseudocoelomate worms.`,B:`Our adults live in the intestines of vertebrates, while our larvae develop inside arthropod intermediate hosts.`,C:`Like tapeworms, we have completely lost all traces of a mouth and digestive tract, absorbing nutrients across our body wall.`,D:`Our defining diagnostic trait is an anterior eversible, cylindrical proboscis armed with curved chitinous hooks.`},options:[`Nematoda`,`Acanthocephala`,`Platyhelminthes`,`Priapulida`],correctOption:`Acanthocephala`,explanation:`Acanthocephala ('spiny-headed worms') are endoparasitic pseudocoelomates lacking a gut and possessing an eversible, hooked proboscis.`},{id:84,unit:`Unit V`,category:`minor-phyla-1`,questionNumber:4,answer:`Sipuncula`,clues:{A:`We are an unsegmented phylum of marine coelomate worms, commonly known as 'peanut worms'.`,B:`When disturbed, we retract the anterior portion of our body into our plump trunk, resembling a peanut shell.`,C:`Our anterior retractable region is an introvert crowned with ciliated tentacles surrounding the mouth.`,D:`Our alimentary canal is famously twisted into a U-shaped loop, with the anus located anteriorly on the dorsal trunk.`},options:[`Echiura`,`Sipuncula`,`Pogonophora`,`Nemertea`],correctOption:`Sipuncula`,explanation:`Sipuncula (peanut worms) are unsegmented marine coelomates with a retractable introvert, U-shaped gut with an anterior dorsal anus, and no segmentation.`},{id:85,unit:`Unit V`,category:`minor-phyla-1`,questionNumber:5,answer:`Pogonophora`,clues:{A:`We are deep-sea, benthic tubiculous worms commonly known as 'beard worms' (Family Siboglinidae).`,B:`We inhabit secretively inside upright, rigid tubes composed of protein and chitin on the ocean floor.`,C:`In full adult life, we completely lack a mouth, gut, and anus.`,D:`We thrive around deep-sea hydrothermal vents and cold seeps by harboring chemosynthetic sulfur-oxidizing endosymbiotic bacteria.`},options:[`Pogonophora`,`Chaetognatha`,`Brachiopoda`,`Gnathostomulida`],correctOption:`Pogonophora`,explanation:`Pogonophora (beard worms / siboglinids) are deep-sea tubeworms lacking a digestive system that derive nutrition from chemosynthetic bacterial endosymbionts.`},{id:86,unit:`Unit V`,category:`minor-phyla-1`,questionNumber:6,answer:`Trophosome`,clues:{A:`I am a specialized internal organ found inside pogonophoran tubeworms like Riftia pachyptila.`,B:`I occupy a major portion of the coelomic cavity, highly vascularized with red blood containing hemoglobin.`,C:`Embryologically, I develop from modified endodermal tissue of the primitive gut.`,D:`I am packed with trillions of chemolithoautotrophic sulfur-oxidizing bacteria that synthesize food for the host worm.`},options:[`Chloragogen`,`Trophosome`,`Clitellum`,`Hepatopancreas`],correctOption:`Trophosome`,explanation:`The trophosome is a vascularized internal organ in pogonophorans (such as hydrothermal vent giant tubeworms) that houses symbiotic sulfur-oxidizing bacteria.`},{id:87,unit:`Unit V`,category:`minor-phyla-1`,questionNumber:7,answer:`Introvert`,clues:{A:`I am a prominent diagnostic anatomical region found in sipunculid and priapulid worms.`,B:`I am located at the extreme anterior end of the body.`,C:`I can be rapidly introverted (inverted inside-out) into the body trunk by powerful retractor muscles.`,D:`When fully extended, my tip displays tentacles or spines utilized for burrowing and gathering detritus.`},options:[`Proboscis`,`Introvert`,`Corona`,`Lophophore`],correctOption:`Introvert`,explanation:`An introvert is an eversible, retractable anterior body region characteristic of Sipuncula and priapulids, operated by specialized retractor muscles.`},{id:88,unit:`Unit V`,category:`minor-phyla-1`,questionNumber:8,answer:`Lorica`,clues:{A:`I am a hardened external protective structure found in many rotifers and loriciferans.`,B:`I am secreted by the syncytial epidermis beneath a thin cuticular layer.`,C:`I often form rigid plates, facets, ridges, and spines that provide defense against micro-predators.`,D:`My presence divides rotifers into 'loricate' forms with armored boxes and 'illoricite' soft-bodied forms.`},options:[`Periderm`,`Lorica`,`Theca`,`Frustule`],correctOption:`Lorica`,explanation:`A lorica is a rigid, protective shell-like external cuticular casing enclosing the body in many species of rotifers and loriciferans.`},{id:89,unit:`Unit V`,category:`minor-phyla-1`,questionNumber:9,answer:`Syndermata`,clues:{A:`I am a modern phylogenetic clade supported strongly by both ultrastructure and molecular sequencing.`,B:`I unite the free-living Phylum Rotifera with the parasitic Phylum Acanthocephala.`,C:`My shared derived synapomorphy is a unique syncytial epidermis reinforced by an intracytoplasmic lamina.`,D:`Because acanthocephalans are nested inside rotifers, I demonstrate that spiny-headed worms are highly modified parasitic rotifers.`},options:[`Ecdysozoa`,`Syndermata`,`Lophophorata`,`Gnathifera`],correctOption:`Syndermata`,explanation:`Syndermata is the monophyletic clade uniting Rotifera and Acanthocephala based on their unique syncytial epidermis and genomic similarities.`},{id:90,unit:`Unit V`,category:`minor-phyla-1`,questionNumber:10,answer:`Pelagosphera Larva`,clues:{A:`I am a specialized swimming marine larval stage in the life cycle of Sipuncula.`,B:`I develop secondarily from an initial trochophore-like stage.`,C:`I have a prominent ciliated metatroch band and can survive for months drifting in open ocean currents.`,D:`My long pelagic lifespan enables peanut worms to disperse across vast ocean basins before settling into benthic sediments.`},options:[`Bipinnaria`,`Pelagosphera Larva`,`Planula`,`Pilidium`],correctOption:`Pelagosphera Larva`,explanation:`The pelagosphera is a long-lived oceanic swimming larval stage characteristic of many sipunculids that develops after the trochophore stage.`},{id:91,unit:`Unit V`,category:`minor-phyla-2`,questionNumber:1,answer:`Lophophore`,clues:{A:`I am a specialized feeding and respiratory organ that gives name to the classical Lophophorata.`,B:`I consist of a circular, horseshoe-shaped, or coiled fold of the body wall.`,C:`I bear a crown of hollow, ciliated tentacles surrounding the mouth, while the anus is positioned outside.`,D:`My interior contains an extension of the coelom, shared by Ectoprocta, Brachiopoda, and Phoronida.`},options:[`Corona`,`Lophophore`,`Introvert`,`Aristotle's Lantern`],correctOption:`Lophophore`,explanation:`A lophophore is a horseshoe-shaped or circular ciliated tentacular feeding structure containing a coelomic cavity, shared by bryozoans, brachiopods, and phoronids.`},{id:92,unit:`Unit V`,category:`minor-phyla-2`,questionNumber:2,answer:`Ectoprocta`,clues:{A:`We are an abundant phylum of microscopic, colonial aquatic lophophorates, commonly known as 'moss animals' (Bryozoa).`,B:`Our colonies are composed of thousands of minute, interconnected modular individuals called zooids.`,C:`Each zooid secretes a rigid organic or calcified protective exoskeletal box called a zooecium.`,D:`Our name translates from Greek as 'outside anus', because our anus opens completely outside our ciliated lophophore ring.`},options:[`Entoprocta`,`Ectoprocta`,`Brachiopoda`,`Phoronida`],correctOption:`Ectoprocta`,explanation:`Ectoprocta (Bryozoa / moss animals) are colonial lophophorate coelomates whose anus opens outside the tentacular crown of the lophophore.`},{id:93,unit:`Unit V`,category:`minor-phyla-2`,questionNumber:3,answer:`Entoprocta`,clues:{A:`We are a small phylum of solitary or colonial pseudocoelomate marine animals, also called Kamptozoa ('nodding animals').`,B:`Our body consists of a cup-shaped calyx mounted on an anchor stalk.`,C:`Our calyx is crowned with a ring of ciliated tentacles that roll inwards when disturbed.`,D:`Our name means 'inside anus', because both our mouth and our anus open inside the tentacular ring.`},options:[`Ectoprocta`,`Entoprocta`,`Brachiopoda`,`Chaetognatha`],correctOption:`Entoprocta`,explanation:`Entoprocta (Kamptozoa) are pseudocoelomates whose tentacular ring encloses both the mouth and the anus, unlike true ectoprocts.`},{id:94,unit:`Unit V`,category:`minor-phyla-2`,questionNumber:4,answer:`Brachiopoda`,clues:{A:`We are a venerable phylum of solitary, marine, coelomate lophophorates known colloquially as 'lamp shells'.`,B:`Our soft body is encased inside two calcareous or phosphatic valves that superficially resemble bivalve molluscs.`,C:`Unlike clams, our two valves are unequal in size and oriented dorsally and ventrally rather than laterally.`,D:`Our ventral pedicle valve usually features a prominent beak with an opening for a fleshy anchoring stalk.`},options:[`Bivalvia`,`Brachiopoda`,`Ectoprocta`,`Cirripedia`],correctOption:`Brachiopoda`,explanation:`Brachiopods (lamp shells) are bivalved lophophorates with dorsal and ventral valves (rather than lateral shells like clams) anchored by a pedicle.`},{id:95,unit:`Unit V`,category:`minor-phyla-2`,questionNumber:5,answer:`Chaetognatha`,clues:{A:`We are an exclusively marine, planktonic phylum of voracious micro-predators commonly known as 'arrow worms'.`,B:`Our elongate, torpedo-shaped bodies are nearly 100% transparent in ocean water.`,C:`We feature horizontal lateral fins and a tail fin used for rapid darting swimming motions.`,D:`Our head is armed with formidable, movable chitinous grasping spines used to seize copepods and larval fishes.`},options:[`Nematomorpha`,`Chaetognatha`,`Kinorhyncha`,`Gastrotricha`],correctOption:`Chaetognatha`,explanation:`Chaetognatha (arrow worms) are transparent, torpedo-shaped marine predators equipped with chitinous grasping spines around the mouth and horizontal fins.`},{id:96,unit:`Unit V`,category:`minor-phyla-2`,questionNumber:6,answer:`Pedicle`,clues:{A:`I am a prominent fleshy muscular stalk found in the phylum Brachiopoda.`,B:`I emerge through a specialized foramen at the beak of the larger ventral valve.`,C:`I secrete chitinous anchoring fibrils or cementing substances at my distal tip.`,D:`My primary function is to securely anchor the sessile lamp shell to rocks, shells, or muddy substrate.`},options:[`Byssus`,`Pedicle`,`Introvert`,`Stolons`],correctOption:`Pedicle`,explanation:`The pedicle is a fleshy, muscular stalk in brachiopods that anchors the animal to the hard or sandy marine substrate.`},{id:97,unit:`Unit V`,category:`minor-phyla-2`,questionNumber:7,answer:`Statoblasts`,clues:{A:`We are specialized asexual survival gemmule-like structures produced by freshwater bryozoans (Phylactolaemata).`,B:`We are produced internally along the funiculus during late summer and autumn.`,C:`We are encased in two protective, sclerotized biconvex chitinous valves resistant to freezing and complete desiccation.`,D:`When favorable spring conditions return, we germinate into a new founder zooid (ancestrula) to establish a fresh colony.`},options:[`Statocysts`,`Statoblasts`,`Gemmules`,`Cysticerci`],correctOption:`Statoblasts`,explanation:`Statoblasts are tough, dormant asexual reproductive bodies formed by freshwater bryozoans to survive winter freezing and desiccation.`},{id:98,unit:`Unit V`,category:`minor-phyla-2`,questionNumber:8,answer:`Avicularium`,clues:{A:`I am a specialized, polymorphic heterozooid found in marine gymnolaemate bryozoan colonies.`,B:`My appearance strikingly resembles a miniature bird's head mounted on the colony wall.`,C:`My modified operculum functions like a sharp, snapping lower jaw operated by strong adductor muscles.`,D:`My duty is defense: snapping shut to crush fouling organisms, settling larvae, and small predators.`},options:[`Vibraculum`,`Avicularium`,`Zooecium`,`Kenozooid`],correctOption:`Avicularium`,explanation:`An avicularium is a modified defensive zooid in bryozoan colonies resembling a bird's head with snapping jaws that prevents fouling by other organisms.`},{id:99,unit:`Unit V`,category:`minor-phyla-2`,questionNumber:9,answer:`Zooid`,clues:{A:`I am the basic structural and functional individual unit of any modular colonial animal.`,B:`I am physically and physiologically connected to my neighbors by living tissue channels.`,C:`In bryozoan colonies, I consist of a living polypide inside a non-living protective cystid.`,D:`All members of a colony are genetically identical clones formed by asexual budding from a primary ancestrula.`},options:[`Polymer`,`Zooid`,`Metamere`,`Proglottid`],correctOption:`Zooid`,explanation:`A zooid is an individual member of a colonial organism, such as in Ectoprocta (Bryozoa) or colonial hydroids, budded from a single founder.`},{id:100,unit:`Unit V`,category:`minor-phyla-2`,questionNumber:10,answer:`Cyphonautes Larva`,clues:{A:`I am a distinctive, planktonic larval stage found in certain marine bryozoan life cycles.`,B:`My body has a compressed, triangular, or bell-like silhouette.`,C:`I am enclosed within two transparent, delicate bivalved triangular shells.`,D:`I possess an active ciliated corona and complete functional gut, drifting in coastal waters before settling to metamorphose into an ancestrula.`},options:[`Trochophore Larva`,`Cyphonautes Larva`,`Veliger Larva`,`Nauplius Larva`],correctOption:`Cyphonautes Larva`,explanation:`The cyphonautes is the bivalved, triangular planktotrophic larval stage of certain marine bryozoans (Ectoprocta).`}],r={timerDurationA:20,timerDurationB:20,timerDurationC:20,timerDurationD:20,pointsA:4,pointsB:3,pointsC:2,pointsD:1,pointsWrong:0,questionsPerGame:10,autoAdvanceOnCorrect:!0,autoAdvanceDelayMs:1600,revealAnswerOnD:!0,timeoutAction:`advance`,soundEnabled:!0,defaultPlayerName:`Detective Player`},i={CATEGORIES:`clue_game_categories_v3_syllabus`,QUESTIONS:`clue_game_questions_v3_syllabus`,SETTINGS:`clue_game_settings_v3_syllabus`,SCORES:`clue_game_scores_v3_syllabus`},a=[`animals`,`fruits`,`microorganisms`,`bacteria`,`fossils`,`fossils-ancient-life`],o=new class{constructor(){this.memoryStorage={},this.cleanupLegacyCache()}cleanupLegacyCache(){if(this.isAvailable())try{localStorage.removeItem(`clue_game_categories_v1`),localStorage.removeItem(`clue_game_questions_v1`),localStorage.removeItem(`clue_game_settings_v1`),localStorage.removeItem(`clue_game_scores_v1`),localStorage.removeItem(`clue_game_categories_v2`),localStorage.removeItem(`clue_game_questions_v2`),localStorage.removeItem(`clue_game_settings_v2`),localStorage.removeItem(`clue_game_scores_v2`)}catch{}}isAvailable(){try{let e=`__test__`;return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch{return!1}}getItem(e){if(this.isAvailable()){let t=localStorage.getItem(e);return t?JSON.parse(t):null}return this.memoryStorage[e]||null}setItem(e,t){this.isAvailable()?localStorage.setItem(e,JSON.stringify(t)):this.memoryStorage[e]=t}getCategories(){let e=this.getItem(i.CATEGORIES);return!e||!Array.isArray(e)||e.length===0?(this.setItem(i.CATEGORIES,t),[...t]):e.some(e=>a.includes(e.id))?(this.setItem(i.CATEGORIES,t),this.setItem(i.QUESTIONS,n),[...t]):e}saveCategories(e){this.setItem(i.CATEGORIES,e)}addCategory(e){let t=this.getCategories(),n={id:e.id||e.name.toLowerCase().replace(/[^a-z0-9]/g,`-`)+`-`+Date.now(),unit:e.unit||`Elective Unit`,unitTitle:e.unitTitle||`Custom Unit`,name:e.name.trim(),icon:e.icon||`🎯`,description:e.description||`Custom category created by user`,color:e.color||`#3b82f6`,gradient:e.gradient||`linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.05) 100%)`,borderColor:e.borderColor||`rgba(59, 130, 246, 0.4)`};return t.push(n),this.saveCategories(t),n}updateCategory(e,t){let n=this.getCategories(),r=n.findIndex(t=>t.id===e);return r===-1?null:(n[r]={...n[r],...t},this.saveCategories(n),n[r])}deleteCategory(e){let t=this.getCategories();t=t.filter(t=>t.id!==e),this.saveCategories(t);let n=this.getQuestions();return n=n.filter(t=>t.category!==e),this.saveQuestions(n),!0}getQuestions(e=null){let t=this.getItem(i.QUESTIONS);if(!t||!Array.isArray(t)||t.length===0){this.setItem(i.QUESTIONS,n);let t=[...n];return e?t.filter(t=>t.category===e):t}if(t.some(e=>a.includes(e.category))){this.setItem(i.QUESTIONS,n);let t=[...n];return e?t.filter(t=>t.category===e):t}return e?t.filter(t=>t.category===e):t}saveQuestions(e){this.setItem(i.QUESTIONS,e)}getQuestionById(e){return this.getQuestions().find(t=>t.id===Number(e))||null}addQuestion(e){let t=this.getQuestions(),n={id:t.reduce((e,t)=>Math.max(e,Number(t.id)||0),0)+1,category:e.category,answer:e.answer.trim(),clues:{A:e.clues.A.trim(),B:e.clues.B.trim(),C:e.clues.C.trim(),D:e.clues.D.trim()},options:e.options.map(e=>e.trim()),correctOption:e.correctOption.trim(),explanation:e.explanation?e.explanation.trim():``};return t.push(n),this.saveQuestions(t),n}updateQuestion(e,t){let n=this.getQuestions(),r=n.findIndex(t=>t.id===Number(e));return r===-1?null:(n[r]={...n[r],...t},this.saveQuestions(n),n[r])}deleteQuestion(e){let t=this.getQuestions();return t=t.filter(t=>t.id!==Number(e)),this.saveQuestions(t),!0}getSettings(){let e=this.getItem(i.SETTINGS);return e?{...r,...e}:(this.setItem(i.SETTINGS,r),{...r})}saveSettings(e){this.setItem(i.SETTINGS,e)}resetSettings(){return this.setItem(i.SETTINGS,r),{...r}}getScores(){let e=this.getItem(i.SCORES);return e&&Array.isArray(e)?e:[]}saveScore(e){let t=this.getScores(),n={id:`score-`+Date.now()+`-`+Math.random().toString(36).substring(2,6),playerName:e.playerName||`Detective Player`,categoryId:e.categoryId,categoryName:e.categoryName,score:e.score,maxPossibleScore:e.maxPossibleScore,questionsCompleted:e.questionsCompleted,correctCount:e.correctCount,incorrectCount:e.incorrectCount,percentage:Math.round(e.score/(e.maxPossibleScore||1)*100),stageBreakdown:e.stageBreakdown||{A:0,B:0,C:0,D:0,none:0},timestamp:Date.now(),dateStr:new Date().toLocaleDateString(void 0,{month:`short`,day:`numeric`,hour:`2-digit`,minute:`2-digit`})};return t.unshift(n),t.length>100&&t.pop(),this.setItem(i.SCORES,t),n}clearScores(){this.setItem(i.SCORES,[])}getCurrentPlayerName(){try{if(typeof sessionStorage<`u`)return sessionStorage.getItem(`clue_contest_player_name`)||``}catch{}return this.memoryStorage.clue_contest_player_name||``}setCurrentPlayerName(e){let t=(e||``).trim();try{typeof sessionStorage<`u`&&(t?sessionStorage.setItem(`clue_contest_player_name`,t):sessionStorage.removeItem(`clue_contest_player_name`))}catch{}return this.memoryStorage.clue_contest_player_name=t,t}clearCurrentPlayerName(){try{typeof sessionStorage<`u`&&sessionStorage.removeItem(`clue_contest_player_name`)}catch{}delete this.memoryStorage.clue_contest_player_name}resetAllToDefaults(){this.setItem(i.CATEGORIES,t),this.setItem(i.QUESTIONS,n),this.setItem(i.SETTINGS,r),this.setItem(i.SCORES,[]),this.clearCurrentPlayerName()}},s=new class{constructor(){this.audioCtx=null,this.enabled=!0}init(){if(!this.audioCtx&&typeof window<`u`){let e=window.AudioContext||window.webkitAudioContext;e&&(this.audioCtx=new e)}this.audioCtx&&this.audioCtx.state===`suspended`&&this.audioCtx.resume()}setEnabled(e){this.enabled=!!e}playClick(){if(this.enabled&&(this.init(),this.audioCtx))try{let e=this.audioCtx.createOscillator(),t=this.audioCtx.createGain();e.type=`sine`,e.frequency.setValueAtTime(600,this.audioCtx.currentTime),e.frequency.exponentialRampToValueAtTime(300,this.audioCtx.currentTime+.05),t.gain.setValueAtTime(.08,this.audioCtx.currentTime),t.gain.exponentialRampToValueAtTime(.001,this.audioCtx.currentTime+.05),e.connect(t),t.connect(this.audioCtx.destination),e.start(),e.stop(this.audioCtx.currentTime+.05)}catch{}}playClueReveal(){if(this.enabled&&(this.init(),this.audioCtx))try{let e=this.audioCtx.currentTime,t=this.audioCtx.createOscillator(),n=this.audioCtx.createGain();t.type=`sine`,t.frequency.setValueAtTime(440,e),t.frequency.exponentialRampToValueAtTime(880,e+.15),n.gain.setValueAtTime(.06,e),n.gain.exponentialRampToValueAtTime(.001,e+.2),t.connect(n),n.connect(this.audioCtx.destination),t.start(e),t.stop(e+.2)}catch{}}playCorrect(){if(this.enabled&&(this.init(),this.audioCtx))try{let e=this.audioCtx.currentTime,t=this.audioCtx.createOscillator(),n=this.audioCtx.createGain();t.type=`triangle`,t.frequency.setValueAtTime(659.25,e),n.gain.setValueAtTime(.12,e),n.gain.exponentialRampToValueAtTime(.001,e+.18),t.connect(n),n.connect(this.audioCtx.destination),t.start(e),t.stop(e+.18);let r=this.audioCtx.createOscillator(),i=this.audioCtx.createGain();r.type=`sine`,r.frequency.setValueAtTime(987.77,e+.1),i.gain.setValueAtTime(.15,e+.1),i.gain.exponentialRampToValueAtTime(.001,e+.45),r.connect(i),i.connect(this.audioCtx.destination),r.start(e+.1),r.stop(e+.45)}catch{}}playWrong(){if(this.enabled&&(this.init(),this.audioCtx))try{let e=this.audioCtx.currentTime,t=this.audioCtx.createOscillator(),n=this.audioCtx.createGain();t.type=`sawtooth`,t.frequency.setValueAtTime(220,e),t.frequency.exponentialRampToValueAtTime(130,e+.22),n.gain.setValueAtTime(.09,e),n.gain.exponentialRampToValueAtTime(.001,e+.22),t.connect(n),n.connect(this.audioCtx.destination),t.start(e),t.stop(e+.22)}catch{}}playTick(){if(this.enabled&&(this.init(),this.audioCtx))try{let e=this.audioCtx.currentTime,t=this.audioCtx.createOscillator(),n=this.audioCtx.createGain();t.type=`sine`,t.frequency.setValueAtTime(800,e),n.gain.setValueAtTime(.04,e),n.gain.exponentialRampToValueAtTime(.001,e+.04),t.connect(n),n.connect(this.audioCtx.destination),t.start(e),t.stop(e+.04)}catch{}}playFanfare(){if(this.enabled&&(this.init(),this.audioCtx))try{let e=this.audioCtx.currentTime;[{f:523.25,t:0},{f:659.25,t:.14},{f:783.99,t:.28},{f:1046.5,t:.45}].forEach(({f:t,t:n})=>{let r=this.audioCtx.createOscillator(),i=this.audioCtx.createGain();r.type=`triangle`,r.frequency.setValueAtTime(t,e+n),i.gain.setValueAtTime(.12,e+n),i.gain.exponentialRampToValueAtTime(.001,e+n+.35),r.connect(i),i.connect(this.audioCtx.destination),r.start(e+n),r.stop(e+n+.35)})}catch{}}};function c(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`):``}var l=class{constructor(e,t,n){this.container=e,this.onNameEntered=t,this.onComplete=n,this.state=`entry`,this.playerName=``,this.transitionTimer=null}mount(){this.render()}unmount(){this.transitionTimer&&=(clearTimeout(this.transitionTimer),null)}render(){this.state===`entry`?this.renderEntryScreen():this.renderWelcomeScreen()}renderEntryScreen(){this.container.innerHTML=`
      <div class="view-player-entry">
        <!-- Floating Jungle Vines & Foliage -->
        <div class="jungle-canopy-leaves" aria-hidden="true">
          <span class="canopy-leaf leaf-1">🌿</span>
          <span class="canopy-leaf leaf-2">🍃</span>
          <span class="canopy-leaf leaf-3">🌴</span>
          <span class="canopy-leaf leaf-4">🌱</span>
        </div>

        <!-- Hanging Vines / Ropes -->
        <div class="hanging-ropes" aria-hidden="true">
          <div class="rope-line rope-left"></div>
          <div class="rope-line rope-right"></div>
        </div>

        <!-- Large Wooden Signboard Card -->
        <div class="player-entry-card jungle-signboard">
          <!-- Wooden Corner Pegs -->
          <div class="wood-peg peg-tl"></div>
          <div class="wood-peg peg-tr"></div>
          <div class="wood-peg peg-bl"></div>
          <div class="wood-peg peg-br"></div>

          <!-- Cheerful Animal Friends Peeking from Edges -->
          <div class="safari-animals-cluster" aria-hidden="true">
            <span class="animal-friend animal-giraffe" title="Friendly Giraffe">🦒</span>
            <span class="animal-friend animal-monkey" title="Playful Monkey">🐒</span>
            <span class="animal-friend animal-lion" title="Cheerful Lion">🦁</span>
            <span class="animal-friend animal-parrot" title="Tropical Parrot">🦜</span>
            <span class="animal-friend animal-frog" title="Tree Frog">🐸</span>
            <span class="animal-friend animal-turtle" title="Wise Turtle">🐢</span>
            <span class="animal-friend animal-elephant" title="Gentle Elephant">🐘</span>
          </div>

          <!-- Badge & Heading on Wooden Board -->
          <div class="contest-badge-wood">
            <span class="contest-badge-icon">🐾</span>
            <span>A Zoology Knowledge Challenge</span>
          </div>

          <h1 class="contest-title jungle-wood-title">GUESS THE NAME CONTEST</h1>

          <div class="paw-accent-row" aria-hidden="true">
            <span>🐾</span><span>🐾</span><span>🐾</span>
          </div>

          <!-- Warm Cream Inner Content Paper -->
          <div class="parchment-subcard">
            <p class="contest-subtitle">Enter your name to begin</p>

            <form class="name-entry-form" id="player-name-form" novalidate>
              <div class="form-group-entry">
                <label for="player-name-input" class="sr-only">Enter your name</label>
                <div class="input-glow-wrapper safari-input-wrapper" id="name-input-wrapper">
                  <span class="input-icon-prefix">👤</span>
                  <input
                    type="text"
                    id="player-name-input"
                    class="player-name-input"
                    placeholder="Enter your name"
                    maxlength="50"
                    autocomplete="name"
                    autofocus
                    spellcheck="false"
                    aria-describedby="name-error-msg"
                  />
                </div>
                <div
                  id="name-error-msg"
                  class="name-error-msg"
                  role="alert"
                  aria-live="polite"
                  style="display: none;"
                >
                  <span class="error-icon">⚠️</span>
                  <span>Please enter your name to continue.</span>
                </div>
              </div>

              <button type="submit" id="btn-continue-name" class="btn-continue-contest jungle-btn-primary">
                <span>Continue</span>
                <span class="btn-arrow">➔</span>
              </button>
            </form>
          </div>

          <div class="contest-card-footer">
            <span>🌿 Zoology &amp; Animal Science Department • 10 Syllabus Categories 🐾</span>
          </div>
        </div>
      </div>
    `;let e=this.container.querySelector(`#player-name-form`),t=this.container.querySelector(`#player-name-input`);e&&e.addEventListener(`submit`,e=>{e.preventDefault(),this.handleSubmit()}),t&&(t.addEventListener(`input`,()=>{this.clearError()}),t.addEventListener(`keydown`,e=>{e.key===`Enter`&&(e.preventDefault(),this.handleSubmit())}),setTimeout(()=>{t.focus()},50))}handleSubmit(){let e=this.container.querySelector(`#player-name-input`);if(!e)return;let t=e.value.trim();if(!t){this.showError(`Please enter your name to continue.`),s.playWrong(),e.focus();return}this.playerName=t,s.playClick(),this.onNameEntered&&this.onNameEntered(this.playerName),this.showWelcomeScreen()}showError(e){let t=this.container.querySelector(`#name-error-msg`),n=this.container.querySelector(`#name-input-wrapper`),r=this.container.querySelector(`#player-name-input`);t&&(t.innerHTML=`<span class="error-icon">⚠️</span> <span>${c(e)}</span>`,t.style.display=`flex`),n&&n.classList.add(`input-has-error`),r&&r.setAttribute(`aria-invalid`,`true`)}clearError(){let e=this.container.querySelector(`#name-error-msg`),t=this.container.querySelector(`#name-input-wrapper`),n=this.container.querySelector(`#player-name-input`);e&&(e.style.display=`none`),t&&t.classList.remove(`input-has-error`),n&&n.removeAttribute(`aria-invalid`)}showWelcomeScreen(){this.state=`welcome`,this.renderWelcomeScreen(),this.transitionTimer=setTimeout(()=>{this.onComplete&&this.onComplete(this.playerName)},2e3)}renderWelcomeScreen(){this.container.innerHTML=`
      <div class="view-welcome-screen animate-welcome-entry">
        <!-- Floating Jungle Canopy -->
        <div class="jungle-canopy-leaves" aria-hidden="true">
          <span class="canopy-leaf leaf-1">🌿</span>
          <span class="canopy-leaf leaf-2">🍃</span>
          <span class="canopy-leaf leaf-3">🌴</span>
        </div>

        <div class="hanging-ropes" aria-hidden="true">
          <div class="rope-line rope-left"></div>
          <div class="rope-line rope-right"></div>
        </div>

        <!-- Wooden Signboard -->
        <div class="welcome-card jungle-signboard">
          <div class="wood-peg peg-tl"></div>
          <div class="wood-peg peg-tr"></div>
          <div class="wood-peg peg-bl"></div>
          <div class="wood-peg peg-br"></div>

          <!-- Cheerful Animal Friends -->
          <div class="safari-animals-cluster" aria-hidden="true">
            <span class="animal-friend animal-lion" title="Lion">🦁</span>
            <span class="animal-friend animal-parrot" title="Parrot">🦜</span>
            <span class="animal-friend animal-monkey" title="Monkey">🐒</span>
            <span class="animal-friend animal-frog" title="Frog">🐸</span>
          </div>

          <div class="welcome-badge-icon">🌿</div>

          <h1 class="welcome-heading">Welcome, <span class="welcome-player-name">${c(this.playerName)}</span>!</h1>

          <div class="welcome-contest-tag">Guess the Name Contest</div>
          <p class="welcome-subtitle">Get ready to test your knowledge!</p>

          <div class="welcome-loading-container">
            <div class="welcome-progress-bar jungle-progress-track">
              <div class="welcome-progress-fill jungle-progress-leaf"></div>
            </div>
            <span class="welcome-loading-text">Starting in 2 seconds... 🐾</span>
          </div>
        </div>
      </div>
    `}};function u(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`):``}var d=class{constructor(e,t,n,r=``,i=null){this.container=e,this.onSelectCategory=t,this.onOpenNewCategoryModal=n,this.playerName=r,this.onChangePlayer=i}render(){let e=o.getCategories(),t=o.getQuestions(),n=o.getScores(),r=e.map(e=>{let r=t.filter(t=>String(t.category).toLowerCase()===String(e.id).toLowerCase()).length,i=n.filter(t=>t.categoryId===e.id),a=i.reduce((e,t)=>Math.max(e,t.score||0),0);return{...e,questionCount:r,bestScore:i.length>0?a:null}}),i=new Map;r.forEach(e=>{let t=e.unit||`Additional Units`;i.has(t)||i.set(t,{unitName:t,unitTitle:e.unitTitle||``,categories:[]}),i.get(t).categories.push(e)});let a=Array.from(i.values());this.container.innerHTML=`
      <div class="view-category-select">
        <!-- Hero Banner -->
        <header class="hero-banner">
          <div class="hero-pill">
            <span>🎓</span> Academic Zoology Clue Quiz
          </div>
          <h1 class="hero-title">Zoology & Animal Science <span>Syllabus Quest</span></h1>
          <p class="hero-desc">
            Master 5 core Units across 10 specialized categories. Deduce answers from progressive clues A through D!
          </p>

          ${this.playerName?`
            <div class="player-greeting-bar" id="player-greeting-bar">
              <div class="player-greeting-left">
                <span class="player-greeting-icon">👤</span>
                <span class="player-greeting-text">
                  Ready to play, <strong class="player-greeting-name">${u(this.playerName)}</strong>?
                </span>
              </div>
              <button class="btn-change-player" id="btn-change-player" title="Change or Switch Player">
                <span>Switch Player</span>
              </button>
            </div>
          `:``}
        </header>

        <!-- Units and Categories Container -->
        <div class="units-container" style="display:flex; flex-direction:column; gap:2.5rem; margin-bottom:2.5rem;">
          ${a.map(e=>`
            <section class="unit-section">
              <div class="unit-header-bar" style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1rem; padding-bottom:0.5rem; border-bottom:1px solid rgba(255,255,255,0.08);">
                <div style="display:flex; align-items:center; gap:0.6rem;">
                  <span class="stage-badge-small" style="background:var(--primary); font-size:0.8rem; padding:0.25rem 0.6rem;">
                    ${e.unitName}
                  </span>
                  <h2 style="font-family:var(--font-heading); font-size:1.25rem; font-weight:700; color:var(--jungle-deep);">
                    ${e.unitTitle?e.unitTitle:e.unitName}
                  </h2>
                </div>
                <span style="font-size:0.8rem; color:var(--text-muted); font-family:var(--font-mono);">
                  ${e.categories.length} Categories
                </span>
              </div>

              <!-- Category Grid for this Unit -->
              <div class="category-grid" style="margin-bottom:0;">
                ${e.categories.map(e=>`
                  <div class="category-card" 
                       id="cat-card-${e.id}"
                       style="--cat-accent: ${e.color||`#6366f1`}; --cat-border: ${e.borderColor||`rgba(99,102,241,0.4)`};"
                       data-cat-id="${e.id}">
                    <div>
                      <div class="cat-header">
                        <div class="cat-icon-wrap">${e.icon||`🎯`}</div>
                        <div style="display:flex; flex-direction:column; align-items:flex-end; gap:0.25rem;">
                          <span style="font-family:var(--font-mono); font-size:0.7rem; font-weight:700; color:var(--primary);">${e.unit||``}</span>
                          <span class="cat-badge">${e.questionCount} Questions</span>
                        </div>
                      </div>
                      <div class="cat-content">
                        <h3 class="cat-name" style="font-size:1.25rem;">${e.name}</h3>
                        <p class="cat-desc">${e.description||`Solve progressive academic clues.`}</p>
                      </div>
                    </div>
                    <div class="cat-footer">
                      <button class="btn-play-cat" data-cat-id="${e.id}">
                        <span>Start Category</span>
                        <span>➔</span>
                      </button>
                    </div>
                  </div>
                `).join(``)}
              </div>
            </section>
          `).join(``)}
        </div>

        <!-- Category Controls -->
        <div class="category-extras">
          <button class="btn-secondary-action" id="btn-add-custom-cat">
            <span>➕ Add Custom Category</span>
          </button>
        </div>

        <!-- How It Works / Rules Card -->
        <div class="how-to-play-card">
          <h3><span>📜</span> Detective Rules & Scoring</h3>
          <div class="rules-grid">
            <div class="rule-item">
              <div class="stage-badge-small" style="background:#10b981;">Stage A</div>
              <div class="rule-text">
                <strong>4 Points</strong>
                Vague introductory clue. Maximum risk & reward.
              </div>
            </div>
            <div class="rule-item">
              <div class="stage-badge-small" style="background:#06b6d4;">Stage B</div>
              <div class="rule-text">
                <strong>3 Points</strong>
                Specific trait clue. Still high scoring.
              </div>
            </div>
            <div class="rule-item">
              <div class="stage-badge-small" style="background:#f59e0b;">Stage C</div>
              <div class="rule-text">
                <strong>2 Points</strong>
                Distinguishing feature clue.
              </div>
            </div>
            <div class="rule-item">
              <div class="stage-badge-small" style="background:#f43f5e;">Stage D</div>
              <div class="rule-text">
                <strong>1 Point</strong>
                Dead giveaway clue. Answer is revealed if missed!
              </div>
            </div>
          </div>
        </div>
      </div>
    `,this.container.querySelectorAll(`.category-card, .btn-play-cat`).forEach(t=>{t.addEventListener(`click`,n=>{let r=t.getAttribute(`data-cat-id`);if(!r)return;s.playClick();let i=e.find(e=>e.id===r);i&&this.onSelectCategory(i)})});let c=this.container.querySelector(`#btn-add-custom-cat`);c&&c.addEventListener(`click`,()=>{s.playClick(),this.onOpenNewCategoryModal&&this.onOpenNewCategoryModal()});let l=this.container.querySelector(`#btn-change-player`);l&&l.addEventListener(`click`,()=>{s.playClick(),this.onChangePlayer&&this.onChangePlayer()})}};function f(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`):``}var p=class{constructor(e,t,n){this.container=e,this.engine=t,this.onQuit=n,this.keyHandler=null,this.lastSecondTicked=null}mount(){this.setupKeyboardShortcuts(),this.render()}unmount(){this.keyHandler&&=(window.removeEventListener(`keydown`,this.keyHandler),null)}setupKeyboardShortcuts(){this.keyHandler=e=>{let t=this.engine.getSnapshot();if(!t.isAnsweringAllowed||!t.currentQuestion)return;let n=e.key.toUpperCase(),r=t.currentQuestion.options,i=-1;[`1`,`A`].includes(n)?i=0:[`2`,`B`].includes(n)?i=1:[`3`,`C`].includes(n)?i=2:[`4`,`D`].includes(n)&&(i=3),i>=0&&i<r.length&&(e.preventDefault(),this.handleSelectOption(r[i]))},window.addEventListener(`keydown`,this.keyHandler)}handleSelectOption(e){if(!this.engine.getSnapshot().isAnsweringAllowed)return;s.playClick();let t=this.engine.submitAnswer(e);t&&t.isCorrect?s.playCorrect():t&&!t.isCorrect&&s.playWrong()}handleSkipClue(){let e=this.engine.getSnapshot();e.isAnsweringAllowed&&(s.playClick(),e.currentStage===`A`?this.engine.advanceToStage(`B`):e.currentStage===`B`?this.engine.advanceToStage(`C`):e.currentStage===`C`&&this.engine.advanceToStage(`D`))}handleBackNavigation(){s.playClick(),confirm(`Are you sure you want to leave this quiz? Your current progress may be lost.`)&&(this.engine.stopTimer(),this.unmount(),this.onQuit&&this.onQuit())}updateTimer(e,t){let n=this.container.querySelector(`#timer-seconds`),r=this.container.querySelector(`#timer-ring-path`),i=this.container.querySelector(`#timer-widget`);n&&(n.textContent=`${e}s`);let a=Math.max(0,Math.min(100,e/(t||20)*100));r&&(r.setAttribute(`stroke-dasharray`,`${a}, 100`),r.setAttribute(`stroke`,e<=5?`var(--rose)`:`var(--primary)`)),i&&(e<=5?i.classList.add(`urgent`):i.classList.remove(`urgent`)),e<=5&&e>0&&e!==this.lastSecondTicked&&(this.lastSecondTicked=e,s.playTick())}render(){let e=this.engine.getSnapshot();if(!e.currentQuestion){this.container.innerHTML=`<div class="p-6 text-center">Loading question...</div>`;return}let{category:t,currentIndex:n,totalQuestions:r,currentQuestion:i,currentStage:a,timeLeft:o,maxTimeForStage:s,score:c,lastFeedback:l,wrongGuessesThisStage:u,isAnsweringAllowed:d,playerName:p}=e,m=[`A`,`B`,`C`,`D`],h=m.indexOf(a),g=Math.max(0,Math.min(100,o/(s||20)*100)),_=o<=5;this.container.innerHTML=`
      <div class="view-game">
        <!-- Top Bar with Top-Left Back Button -->
        <div class="game-top-bar">
          <div class="game-meta-group">
            <button class="btn-top-back" id="btn-top-back" title="Return to Categories">
              <span style="font-size:1.1rem; line-height:1;">←</span>
              <span>Back</span>
            </button>
            <div class="game-cat-tag">
              <span>${t.icon||`🎯`}</span>
              <span>${t.unit?`<strong style="color:var(--primary); font-size:0.8rem; margin-right:4px;">${t.unit}</strong> `:``}${t.name}</span>
            </div>
            <div class="q-progress-indicator">
              Question <span>${n+1}</span> / ${r}
            </div>
            <div class="game-player-tag" title="Active Contestant">
              <span class="player-tag-icon">👤</span>
              <span class="player-tag-name">${f(p||`Player`)}</span>
            </div>
          </div>

          <!-- Score Counter -->
          <div class="game-score-display">
            <span class="score-label">Score</span>
            <span class="score-num" id="current-score-num">${c}</span>
          </div>
        </div>

        <!-- Stage Stepper & Isolated Timer Banner -->
        <div class="stage-stepper-container">
          <div class="stepper-steps">
            ${m.map((e,t)=>{let n=e===a,r=t<h,i=this.engine.getStagePoints(e);return`
                  <div class="stage-step ${n?`active`:``} ${r?`passed`:``}">
                    <span class="stage-letter">Stage ${e}</span>
                    <span class="stage-pts-badge">${i} pts</span>
                  </div>
                  ${t<3?`<span class="stepper-divider">➔</span>`:``}
                `}).join(``)}
          </div>

          <!-- Animated Timer (Updated independently per tick) -->
          <div class="timer-widget ${_?`urgent`:``}" id="timer-widget">
            <div class="timer-ring-container">
              <svg width="32" height="32" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.15)"
                  stroke-width="3.5"
                />
                <path
                  id="timer-ring-path"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="${_?`var(--rose)`:`var(--primary)`}"
                  stroke-width="3.5"
                  stroke-dasharray="${g}, 100"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <div class="timer-seconds" id="timer-seconds">${o}s</div>
          </div>
        </div>

        <!-- Clues Board (Progressive Reveal) -->
        <div class="clues-board">
          <div class="clues-board-header">
            <span class="clues-title">
              <span>🔍</span> Clue Dossier
            </span>
            <span style="font-size:0.8rem; color:var(--text-muted);">
              Clue ${a} of 4 Active
            </span>
          </div>

          <div class="clue-stream">
            ${m.map((e,t)=>{let n=t<=h,r=e===a,o=i.clues[e]||``;return n?`
                    <div class="clue-item ${r?`active`:``}">
                      <div class="clue-tag">${e}</div>
                      <div class="clue-text">"${o}"</div>
                    </div>
                  `:`
                    <div class="clue-item hidden-clue">
                      <div class="clue-tag">${e}</div>
                      <div class="clue-text">Clue ${e} is currently classified...</div>
                    </div>
                  `}).join(``)}
          </div>
        </div>

        <!-- Feedback Banner if active -->
        ${l?`
          <div class="feedback-banner ${l.type}">
            <div class="feedback-content">
              <div class="feedback-title">
                ${l.type===`correct`?`🐾 CORRECT! +`+(l.points==null?``:l.points)+` POINTS!`:l.type===`timeout`?`⏱️ Time's Up for this Clue!`:l.type===`incorrect-d`?`❌ Question Missed`:`❌ Not quite! Checking next clue...`}
              </div>
              <div class="feedback-sub">${l.message}</div>
              ${l.explanation?`<div style="font-size:0.9rem; margin-top:0.4rem; color:#1f2937; background:rgba(255,255,255,0.8); padding:0.5rem 0.85rem; border-radius:10px; border:1px solid #d1fae5;">📖 <strong>Explanation:</strong> <em>${f(l.explanation)}</em></div>`:``}
            </div>
          </div>
        `:``}

        <!-- 4 Answer Options -->
        <div class="options-section">
          <div class="options-heading">
            <span>Select Answer (Keys 1-4 or Click)</span>
            <span>Current Stake: ${this.engine.getStagePoints(a)} Points</span>
          </div>

          <div class="options-grid">
            ${i.options.map((e,t)=>{let n=[`A`,`B`,`C`,`D`][t],r=u.includes(e),i=l&&(l.correctOption===e||l.type===`correct`&&l.selectedOption===e),a=``;return i?a=`state-correct`:r&&(a=`state-wrong`),`
                  <button 
                    class="option-btn ${a}" 
                    data-option="${e.replace(/"/g,`&quot;`)}"
                    ${!d||r?`disabled`:``}>
                    <span class="option-badge">${n}</span>
                    <span class="option-text">${e}</span>
                  </button>
                `}).join(``)}
          </div>
        </div>

        <!-- Bottom Controls -->
        <div class="game-bottom-bar">
          <button class="btn-ghost" id="btn-quit-game">
            <span>✕ Abandon Investigation</span>
          </button>
          
          ${a!==`D`&&d?`
            <button class="btn-ghost" id="btn-skip-clue" title="Advance to next clue immediately without waiting">
              <span>Next Clue ➔</span>
            </button>
          `:``}
        </div>
      </div>
    `;let v=this.container.querySelector(`#btn-top-back`);v&&v.addEventListener(`click`,()=>this.handleBackNavigation()),this.container.querySelectorAll(`.option-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-option`);t&&this.handleSelectOption(t)})});let y=this.container.querySelector(`#btn-skip-clue`);y&&y.addEventListener(`click`,()=>this.handleSkipClue());let b=this.container.querySelector(`#btn-quit-game`);b&&b.addEventListener(`click`,()=>this.handleBackNavigation())}};function m(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`):``}var h=class{constructor(e,t,n,r,i){this.container=e,this.stats=t,this.onPlayAgain=n,this.onChooseCategory=r,this.onViewScoreboard=i,this.showReview=!1}mount(){s.playFanfare(),this.render()}render(){let{playerName:e,categoryName:t,categoryIcon:n,score:r,maxPossibleScore:i,questionsCompleted:a,correctCount:o,incorrectCount:c,percentage:l,accuracy:u,stageBreakdown:d,questionResults:f}=this.stats,p=`🕵️‍♂️ Detective`;l>=90?p=`🌟 Master Sleuth`:l>=70?p=`🔍 Senior Investigator`:l<50&&(p=`📋 Cadet In Training`),this.container.innerHTML=`
      <div class="view-results">
        <div class="results-card">
          <div class="results-badge-icon">🏆</div>
          <h1 class="results-title">Well played, <span class="results-player-name">${m(e||`Player`)}</span>!</h1>
          <div class="results-contest-tag" style="display:inline-block; background:#fef9ed; border:1.5px solid #5c3214; color:#3e1f0a; font-family:var(--font-heading); font-size:0.9rem; font-weight:700; padding:0.25rem 0.85rem; border-radius:999px; margin-bottom:0.5rem;">
            Guess the Name Contest 🐾
          </div>
          <div class="results-cat-name">${this.stats.unit?this.stats.unit+` • `:``}${t} Investigation • ${p}</div>

          <!-- Quick Summary Badges -->
          <div class="results-stat-pills-row" style="display:flex; justify-content:center; gap:0.65rem; margin-bottom:1.5rem; flex-wrap:wrap;">
            <span class="results-pill-item" style="background:#ecfdf5; border:1.5px solid #a7f3d0; color:#065f46; font-family:var(--font-heading); font-size:0.9rem; font-weight:700; padding:0.3rem 0.85rem; border-radius:999px;">
              ✅ ${o} Correct
            </span>
            <span class="results-pill-item" style="background:#fff1f2; border:1.5px solid #fecdd3; color:#9f1239; font-family:var(--font-heading); font-size:0.9rem; font-weight:700; padding:0.3rem 0.85rem; border-radius:999px;">
              ❌ ${c} Incorrect
            </span>
            <span class="results-pill-item" style="background:#f8fafc; border:1.5px solid #e2e8f0; color:#475569; font-family:var(--font-heading); font-size:0.9rem; font-weight:700; padding:0.3rem 0.85rem; border-radius:999px;">
              📝 ${a} Questions
            </span>
          </div>

          <!-- Score Hero Box -->
          <div class="score-hero-box" style="grid-template-columns: repeat(4, 1fr);">
            <div class="stat-metric">
              <span class="metric-value highlight-gold">${r} <span style="font-size:1.1rem; color:var(--text-muted);">/ ${i}</span></span>
              <span class="metric-label">Score</span>
            </div>
            <div class="stat-metric">
              <span class="metric-value highlight-green">${o} <span style="font-size:1.1rem; color:var(--text-muted);">/ ${a}</span></span>
              <span class="metric-label">Correct Answers</span>
            </div>
            <div class="stat-metric">
              <span class="metric-value highlight-rose" style="color:var(--rose);">${c}</span>
              <span class="metric-label">Incorrect Answers</span>
            </div>
            <div class="stat-metric">
              <span class="metric-value">${u}%</span>
              <span class="metric-label">Accuracy</span>
            </div>
          </div>

          <!-- Stage Breakdown -->
          <div class="stage-breakdown-box">
            <div class="breakdown-title">
              <span>🎯 Clue Stage Solves</span>
              <span>Points Earned Per Stage</span>
            </div>
            <div class="stage-pills-row">
              <div class="stage-break-pill">
                <div class="pill-letter">Stage A</div>
                <div class="pill-count">${d.A||0}</div>
                <div class="pill-pts">4 pts each</div>
              </div>
              <div class="stage-break-pill">
                <div class="pill-letter">Stage B</div>
                <div class="pill-count">${d.B||0}</div>
                <div class="pill-pts">3 pts each</div>
              </div>
              <div class="stage-break-pill">
                <div class="pill-letter">Stage C</div>
                <div class="pill-count">${d.C||0}</div>
                <div class="pill-pts">2 pts each</div>
              </div>
              <div class="stage-break-pill">
                <div class="pill-letter">Stage D</div>
                <div class="pill-count">${d.D||0}</div>
                <div class="pill-pts">1 pt each</div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="results-actions">
            <button class="btn-primary-action" id="btn-play-again">
              <span>🟢 Play Again 🔄</span>
            </button>
            <button class="btn-secondary-action" id="btn-choose-cat">
              <span>🏠 Back to Categories</span>
            </button>
            <button class="btn-secondary-action" id="btn-view-board">
              <span>🏆 Scoreboard</span>
            </button>
            <button class="btn-ghost" id="btn-toggle-review" style="width:100%; margin-top:0.5rem;">
              <span>${this.showReview?`▲ Hide Case Breakdown`:`▼ Review All Questions & Clues`}</span>
            </button>
          </div>

          <!-- Question-by-Question Review List -->
          ${this.showReview?`
            <div style="margin-top: 1.5rem; text-align: left; display: flex; flex-direction: column; gap: 0.75rem;">
              ${f.map((e,t)=>`
                <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1rem;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
                    <strong style="font-size:0.95rem;">Question ${t+1}: ${e.answer}</strong>
                    <span style="font-family:var(--font-mono); font-size:0.8rem; font-weight:700; color:${e.isCorrect?`var(--emerald)`:`var(--rose)`};">
                      ${e.isCorrect?`✓ Solved at Stage ${e.stage} (+${e.points} pts)`:`✗ Missed (0 pts)`}
                    </span>
                  </div>
                  ${e.explanation?`<div style="font-size:0.85rem; color:var(--text-muted); line-height:1.4;">${e.explanation}</div>`:``}
                </div>
              `).join(``)}
            </div>
          `:``}
        </div>
      </div>
    `;let h=this.container.querySelector(`#btn-play-again`);h&&h.addEventListener(`click`,()=>{s.playClick(),this.onPlayAgain&&this.onPlayAgain()});let g=this.container.querySelector(`#btn-choose-cat`);g&&g.addEventListener(`click`,()=>{s.playClick(),this.onChooseCategory&&this.onChooseCategory()});let _=this.container.querySelector(`#btn-view-board`);_&&_.addEventListener(`click`,()=>{s.playClick(),this.onViewScoreboard&&this.onViewScoreboard()});let v=this.container.querySelector(`#btn-toggle-review`);v&&v.addEventListener(`click`,()=>{s.playClick(),this.showReview=!this.showReview,this.render()})}},g=class{constructor(e){this.onClose=e,this.selectedCatFilter=`all`}render(){let e=document.getElementById(`scoreboard-modal`);e||(e=document.createElement(`div`),e.id=`scoreboard-modal`,e.className=`modal-backdrop`,document.body.appendChild(e));let t=o.getScores(),n=o.getCategories(),r=this.selectedCatFilter===`all`?t:t.filter(e=>e.categoryId===this.selectedCatFilter),i=t.length,a=t.reduce((e,t)=>Math.max(e,t.score||0),0),c=i>0?Math.round(t.reduce((e,t)=>e+t.correctCount/(t.questionsCompleted||1)*100,0)/i):0;e.innerHTML=`
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-title">
            <span>🏆</span> Safari Expedition Scoreboard 🐾
          </div>
          <button class="btn-icon" id="btn-close-scoreboard">✕</button>
        </div>

        <div class="modal-body">
          <!-- Overview Metrics -->
          <div class="score-hero-box" style="margin-bottom:1.25rem; padding:1.2rem;">
            <div class="stat-metric">
              <span class="metric-value highlight-gold">${a}</span>
              <span class="metric-label">High Score</span>
            </div>
            <div class="stat-metric">
              <span class="metric-value">${i}</span>
              <span class="metric-label">Expeditions Completed</span>
            </div>
            <div class="stat-metric">
              <span class="metric-value highlight-green">${c}%</span>
              <span class="metric-label">Average Accuracy</span>
            </div>
          </div>

          <!-- Category Filter Bar -->
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
            <div style="display:flex; gap:0.4rem; align-items:center;">
              <span style="font-size:0.85rem; color:var(--text-muted); font-weight:600;">Filter:</span>
              <select class="form-select" id="score-cat-filter" style="padding:0.4rem 0.75rem; font-size:0.85rem;">
                <option value="all" ${this.selectedCatFilter===`all`?`selected`:``}>All Categories</option>
                ${n.map(e=>`<option value="${e.id}" ${this.selectedCatFilter===e.id?`selected`:``}>${e.name}</option>`).join(``)}
              </select>
            </div>

            ${t.length>0?`<button class="btn-ghost" id="btn-clear-scores" style="font-size:0.8rem; padding:0.4rem 0.8rem; color:var(--rose);">Clear Score History</button>`:``}
          </div>

          <!-- Score Table -->
          ${r.length===0?`
            <div style="text-align:center; padding:3rem 1rem; color:var(--text-muted);">
              <div style="font-size:2.5rem; margin-bottom:0.5rem;">📜</div>
              <p>No detective records found yet. Complete a case to enter the scoreboard!</p>
            </div>
          `:`
            <div class="table-responsive">
              <table class="custom-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Player</th>
                    <th>Category</th>
                    <th>Score</th>
                    <th>Correct / Total</th>
                    <th>Accuracy</th>
                  </tr>
                </thead>
                <tbody>
                  ${r.map(e=>`
                    <tr>
                      <td style="font-size:0.8rem; color:var(--text-muted);">${e.dateStr||`Recent`}</td>
                      <td style="font-weight:600;">${e.playerName||`Detective`}</td>
                      <td>
                        <span style="display:inline-flex; align-items:center; gap:0.4rem;">
                          ${e.unit?`<span class="stage-badge-small" style="background:var(--primary); font-size:0.65rem; padding:0.15rem 0.35rem;">${e.unit}</span>`:``}
                          <span>${e.categoryName}</span>
                        </span>
                      </td>
                      <td>
                        <strong style="font-family:var(--font-mono); color:var(--gold); font-size:1.05rem;">
                          ${e.score}
                        </strong> 
                        <span style="font-size:0.75rem; color:var(--text-dim);">/ ${e.maxPossibleScore}</span>
                      </td>
                      <td style="font-family:var(--font-mono);">${e.correctCount} / ${e.questionsCompleted}</td>
                      <td>
                        <span style="font-family:var(--font-mono); font-weight:700; color:${e.percentage>=70?`var(--emerald)`:`var(--amber)`};">
                          ${e.percentage}%
                        </span>
                      </td>
                    </tr>
                  `).join(``)}
                </tbody>
              </table>
            </div>
          `}
        </div>

        <div class="modal-footer">
          <button class="btn-secondary-action" id="btn-close-scoreboard-footer">Close</button>
        </div>
      </div>
    `;let l=()=>{s.playClick(),e.remove(),this.onClose&&this.onClose()};e.querySelector(`#btn-close-scoreboard`).addEventListener(`click`,l),e.querySelector(`#btn-close-scoreboard-footer`).addEventListener(`click`,l),e.addEventListener(`click`,t=>{t.target===e&&l()});let u=e.querySelector(`#score-cat-filter`);u&&u.addEventListener(`change`,e=>{s.playClick(),this.selectedCatFilter=e.target.value,this.render()});let d=e.querySelector(`#btn-clear-scores`);d&&d.addEventListener(`click`,()=>{confirm(`Are you sure you want to clear all recorded scoreboard entries?`)&&(s.playClick(),o.clearScores(),this.render())})}},_=class{constructor(e,t){this.onClose=e,this.onSettingsSaved=t,this.activeTab=`gameplay`,this.editingCategory=null,this.editingQuestion=null,this.selectedCatForQuestions=`all`}render(){let e=document.getElementById(`settings-modal`);e||(e=document.createElement(`div`),e.id=`settings-modal`,e.className=`modal-backdrop`,document.body.appendChild(e));let t=o.getSettings(),n=o.getCategories(),r=o.getQuestions();e.innerHTML=`
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-title">
            <span>⚙️</span> Game Settings & Content Management
          </div>
          <button class="btn-icon" id="btn-close-settings">✕</button>
        </div>

        <div class="modal-body">
          <!-- Navigation Tabs -->
          <div class="modal-tabs">
            <button class="tab-btn ${this.activeTab===`gameplay`?`active`:``}" data-tab="gameplay">
              ⏱️ Gameplay & Points
            </button>
            <button class="tab-btn ${this.activeTab===`behavior`?`active`:``}" data-tab="behavior">
              🎮 Behavior & Audio
            </button>
            <button class="tab-btn ${this.activeTab===`categories`?`active`:``}" data-tab="categories">
              📂 Categories (${n.length})
            </button>
            <button class="tab-btn ${this.activeTab===`questions`?`active`:``}" data-tab="questions">
              ❓ Questions (${r.length})
            </button>
          </div>

          <!-- Tab 1: Gameplay & Points -->
          ${this.activeTab===`gameplay`?`
            <div>
              <h3 style="font-size:1.15rem; margin-bottom:1rem; color:var(--jungle-deep); font-family:var(--font-heading);">⏱️ Timer Duration per Clue Stage (seconds)</h3>
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">Clue Stage A Timer (s)</label>
                  <input type="number" class="form-input" id="setting-timer-a" min="5" max="120" value="${t.timerDurationA||20}">
                </div>
                <div class="form-group">
                  <label class="form-label">Clue Stage B Timer (s)</label>
                  <input type="number" class="form-input" id="setting-timer-b" min="5" max="120" value="${t.timerDurationB||20}">
                </div>
                <div class="form-group">
                  <label class="form-label">Clue Stage C Timer (s)</label>
                  <input type="number" class="form-input" id="setting-timer-c" min="5" max="120" value="${t.timerDurationC||20}">
                </div>
                <div class="form-group">
                  <label class="form-label">Clue Stage D Timer (s)</label>
                  <input type="number" class="form-input" id="setting-timer-d" min="5" max="120" value="${t.timerDurationD||20}">
                </div>
              </div>

              <h3 style="font-size:1.15rem; margin-bottom:1rem; color:var(--jungle-deep); font-family:var(--font-heading);">🏆 Points System</h3>
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">Points for Stage A Solve</label>
                  <input type="number" class="form-input" id="setting-points-a" min="1" max="100" value="${t.pointsA||4}">
                </div>
                <div class="form-group">
                  <label class="form-label">Points for Stage B Solve</label>
                  <input type="number" class="form-input" id="setting-points-b" min="1" max="100" value="${t.pointsB||3}">
                </div>
                <div class="form-group">
                  <label class="form-label">Points for Stage C Solve</label>
                  <input type="number" class="form-input" id="setting-points-c" min="1" max="100" value="${t.pointsC||2}">
                </div>
                <div class="form-group">
                  <label class="form-label">Points for Stage D Solve</label>
                  <input type="number" class="form-input" id="setting-points-d" min="1" max="100" value="${t.pointsD||1}">
                </div>
              </div>

              <div class="form-group" style="max-width:300px; margin-top:0.5rem;">
                <label class="form-label">Questions per Game Session</label>
                <input type="number" class="form-input" id="setting-q-count" min="1" max="50" value="${t.questionsPerGame||10}">
              </div>
            </div>
          `:``}

          <!-- Tab 2: Behavior & Audio -->
          ${this.activeTab===`behavior`?`
            <div>
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">Player Nickname</label>
                  <input type="text" class="form-input" id="setting-player-name" value="${t.defaultPlayerName||`Detective Player`}">
                </div>
                <div class="form-group">
                  <label class="form-label">Auto-Progression Delay (ms)</label>
                  <input type="number" class="form-input" id="setting-advance-delay" min="500" max="5000" step="100" value="${t.autoAdvanceDelayMs||1600}">
                </div>
              </div>

              <div style="display:flex; flex-direction:column; gap:1rem; margin-top:1rem;">
                <label style="display:flex; align-items:center; gap:0.75rem; cursor:pointer;">
                  <input type="checkbox" id="setting-reveal-d" ${t.revealAnswerOnD===!1?``:`checked`} style="width:18px; height:18px; accent-color:var(--primary);">
                  <span><strong>Reveal Correct Answer on Stage D</strong> (Show answer if missed at final clue)</span>
                </label>

                <label style="display:flex; align-items:center; gap:0.75rem; cursor:pointer;">
                  <input type="checkbox" id="setting-sound-enabled" ${t.soundEnabled===!1?``:`checked`} style="width:18px; height:18px; accent-color:var(--primary);">
                  <span><strong>Synthesized Sound Effects</strong> (Chimes, buzzers, and ticking)</span>
                </label>
              </div>

              <div style="margin-top:2rem; padding:1.25rem; border:1px solid rgba(244,63,94,0.3); border-radius:12px; background:rgba(244,63,94,0.05);">
                <h4 style="color:var(--rose); margin-bottom:0.4rem;">⚠️ Factory Reset</h4>
                <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.75rem;">Reset all categories, 40 original questions, scoring, and settings back to factory defaults.</p>
                <button class="btn-ghost" id="btn-factory-reset" style="color:var(--rose); border-color:var(--rose);">Restore All Defaults</button>
              </div>
            </div>
          `:``}

          <!-- Tab 3: Categories CRUD -->
          ${this.activeTab===`categories`?`
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
                <h3 style="font-size:1.15rem; color:var(--jungle-deep); font-family:var(--font-heading);">📂 Available Categories</h3>
                <button class="btn-primary-action" id="btn-create-category-trigger" style="padding:0.4rem 0.85rem; font-size:0.85rem;">
                  ➕ New Category
                </button>
              </div>

              <!-- Form for Add/Edit Category -->
              ${this.editingCategory?`
                <div style="background:rgba(255,255,255,0.03); border:1px solid var(--primary); border-radius:14px; padding:1.25rem; margin-bottom:1.5rem;">
                  <h4 style="margin-bottom:0.75rem; color:var(--primary);">
                    ${this.editingCategory.isNew?`Create New Category`:`Edit Category: `+this.editingCategory.name}
                  </h4>
                  <div class="form-grid">
                    <div class="form-group">
                      <label class="form-label">Category Name</label>
                      <input type="text" class="form-input" id="cat-form-name" value="${this.editingCategory.name||``}">
                    </div>
                    <div class="form-group">
                      <label class="form-label">Icon / Emoji</label>
                      <input type="text" class="form-input" id="cat-form-icon" value="${this.editingCategory.icon||`🎯`}">
                    </div>
                  </div>
                  <div class="form-group" style="margin-bottom:1rem;">
                    <label class="form-label">Description</label>
                    <input type="text" class="form-input" id="cat-form-desc" value="${this.editingCategory.description||``}">
                  </div>
                  <div style="display:flex; gap:0.5rem; justify-content:flex-end;">
                    <button class="btn-ghost" id="btn-cancel-cat-edit">Cancel</button>
                    <button class="btn-primary-action" id="btn-save-cat-edit" style="padding:0.5rem 1rem; font-size:0.9rem;">Save Category</button>
                  </div>
                </div>
              `:``}

              <!-- Categories List -->
              <div class="table-responsive">
                <table class="custom-table">
                  <thead>
                    <tr>
                      <th>Icon</th>
                      <th>Category Name</th>
                      <th>Questions</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${n.map(e=>{let t=r.filter(t=>String(t.category).toLowerCase()===String(e.id).toLowerCase()).length;return`
                        <tr>
                          <td style="font-size:1.5rem;">${e.icon}</td>
                          <td>
                            <strong>${e.name}</strong>
                            <div style="font-size:0.75rem; color:var(--text-muted);">${e.description||``}</div>
                          </td>
                          <td style="font-family:var(--font-mono);">${t}</td>
                          <td>
                            <div style="display:flex; gap:0.4rem;">
                              <button class="btn-ghost btn-edit-cat" data-id="${e.id}" style="padding:0.3rem 0.6rem; font-size:0.8rem;">Edit</button>
                              <button class="btn-ghost btn-delete-cat" data-id="${e.id}" style="padding:0.3rem 0.6rem; font-size:0.8rem; color:var(--rose);">Delete</button>
                            </div>
                          </td>
                        </tr>
                      `}).join(``)}
                  </tbody>
                </table>
              </div>
            </div>
          `:``}

          <!-- Tab 4: Questions CRUD -->
          ${this.activeTab===`questions`?`
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
                <div style="display:flex; align-items:center; gap:0.5rem;">
                  <span style="font-size:0.85rem; color:var(--text-muted); font-weight:600;">Category:</span>
                  <select class="form-select" id="questions-cat-filter" style="padding:0.35rem 0.75rem; font-size:0.85rem;">
                    <option value="all" ${this.selectedCatForQuestions===`all`?`selected`:``}>All Categories</option>
                    ${n.map(e=>`<option value="${e.id}" ${this.selectedCatForQuestions===e.id?`selected`:``}>${e.name}</option>`).join(``)}
                  </select>
                </div>
                <button class="btn-primary-action" id="btn-create-q-trigger" style="padding:0.4rem 0.85rem; font-size:0.85rem;">
                  ➕ New Question
                </button>
              </div>

              <!-- Question Add/Edit Form -->
              ${this.editingQuestion?`
                <div style="background:rgba(255,255,255,0.03); border:1px solid var(--primary); border-radius:14px; padding:1.25rem; margin-bottom:1.5rem;">
                  <h4 style="margin-bottom:0.75rem; color:var(--primary);">
                    ${this.editingQuestion.isNew?`Create New Question`:`Edit Question #`+this.editingQuestion.id}
                  </h4>
                  
                  <div class="form-grid">
                    <div class="form-group">
                      <label class="form-label">Category</label>
                      <select class="form-select" id="q-form-category">
                        ${n.map(e=>`<option value="${e.id}" ${this.editingQuestion.category===e.id?`selected`:``}>${e.name}</option>`).join(``)}
                      </select>
                    </div>
                    <div class="form-group">
                      <label class="form-label">Correct Answer</label>
                      <input type="text" class="form-input" id="q-form-answer" value="${this.editingQuestion.answer||``}" placeholder="e.g. Tiger">
                    </div>
                  </div>

                  <!-- 4 Clues A, B, C, D -->
                  <div style="display:flex; flex-direction:column; gap:0.6rem; margin-bottom:1rem;">
                    <label class="form-label">Progressive Clues (A = Hardest, D = Easiest)</label>
                    <input type="text" class="form-input" id="q-form-clue-a" value="${this.editingQuestion.clues?.A||``}" placeholder="Clue A: Vague hint">
                    <input type="text" class="form-input" id="q-form-clue-b" value="${this.editingQuestion.clues?.B||``}" placeholder="Clue B: Trait hint">
                    <input type="text" class="form-input" id="q-form-clue-c" value="${this.editingQuestion.clues?.C||``}" placeholder="Clue C: Feature hint">
                    <input type="text" class="form-input" id="q-form-clue-d" value="${this.editingQuestion.clues?.D||``}" placeholder="Clue D: Giveaway hint">
                  </div>

                  <!-- 4 Options -->
                  <div class="form-group" style="margin-bottom:1rem;">
                    <label class="form-label">Four Answer Options (One must match the correct answer!)</label>
                    <div class="form-grid">
                      <input type="text" class="form-input" id="q-form-opt-0" value="${this.editingQuestion.options?.[0]||``}" placeholder="Option 1">
                      <input type="text" class="form-input" id="q-form-opt-1" value="${this.editingQuestion.options?.[1]||``}" placeholder="Option 2">
                      <input type="text" class="form-input" id="q-form-opt-2" value="${this.editingQuestion.options?.[2]||``}" placeholder="Option 3">
                      <input type="text" class="form-input" id="q-form-opt-3" value="${this.editingQuestion.options?.[3]||``}" placeholder="Option 4">
                    </div>
                  </div>

                  <!-- Explanation -->
                  <div class="form-group" style="margin-bottom:1rem;">
                    <label class="form-label">Educational Explanation</label>
                    <textarea class="form-textarea" id="q-form-explanation" placeholder="Brief fact revealed at completion...">${this.editingQuestion.explanation||``}</textarea>
                  </div>

                  <div style="display:flex; gap:0.5rem; justify-content:flex-end;">
                    <button class="btn-ghost" id="btn-cancel-q-edit">Cancel</button>
                    <button class="btn-primary-action" id="btn-save-q-edit" style="padding:0.5rem 1rem; font-size:0.9rem;">Save Question</button>
                  </div>
                </div>
              `:``}

              <!-- Questions Table -->
              <div class="table-responsive">
                <table class="custom-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Category</th>
                      <th>Answer</th>
                      <th>Clue Preview</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${r.filter(e=>this.selectedCatForQuestions===`all`||String(e.category).toLowerCase()===String(this.selectedCatForQuestions).toLowerCase()).map(e=>`
                      <tr>
                        <td style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-dim);">${e.id}</td>
                        <td><span class="cat-badge">${e.category}</span></td>
                        <td><strong>${e.answer}</strong></td>
                        <td style="font-size:0.8rem; color:var(--text-muted); max-width:240px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                          ${e.clues?.A||``}
                        </td>
                        <td>
                          <div style="display:flex; gap:0.4rem;">
                            <button class="btn-ghost btn-edit-q" data-id="${e.id}" style="padding:0.3rem 0.6rem; font-size:0.8rem;">Edit</button>
                            <button class="btn-ghost btn-delete-q" data-id="${e.id}" style="padding:0.3rem 0.6rem; font-size:0.8rem; color:var(--rose);">Delete</button>
                          </div>
                        </td>
                      </tr>
                    `).join(``)}
                  </tbody>
                </table>
              </div>
            </div>
          `:``}
        </div>

        <div class="modal-footer">
          <button class="btn-secondary-action" id="btn-save-settings">Save & Apply Changes</button>
        </div>
      </div>
    `,this.attachEventListeners(e)}attachEventListeners(e){let t=()=>{s.playClick(),e.remove(),this.onClose&&this.onClose()};e.querySelector(`#btn-close-settings`).addEventListener(`click`,t),e.addEventListener(`click`,n=>{n.target===e&&t()}),e.querySelectorAll(`.tab-btn`).forEach(e=>{e.addEventListener(`click`,()=>{s.playClick(),this.activeTab=e.getAttribute(`data-tab`),this.editingCategory=null,this.editingQuestion=null,this.render()})});let n=e.querySelector(`#btn-save-settings`);n&&n.addEventListener(`click`,()=>{s.playClick(),this.saveCurrentInputs(e),this.onSettingsSaved&&this.onSettingsSaved(),t()});let r=e.querySelector(`#btn-factory-reset`);r&&r.addEventListener(`click`,()=>{confirm(`Reset everything to factory default questions, categories, and settings?`)&&(s.playClick(),o.resetAllToDefaults(),this.onSettingsSaved&&this.onSettingsSaved(),this.render())});let i=e.querySelector(`#btn-create-category-trigger`);i&&i.addEventListener(`click`,()=>{s.playClick(),this.editingCategory={isNew:!0,name:``,icon:`🎯`,description:``},this.render()}),e.querySelectorAll(`.btn-edit-cat`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`),n=o.getCategories().find(e=>e.id===t);n&&(s.playClick(),this.editingCategory={...n},this.render())})}),e.querySelectorAll(`.btn-delete-cat`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`);confirm(`Delete this category and all its questions?`)&&(s.playClick(),o.deleteCategory(t),this.onSettingsSaved&&this.onSettingsSaved(),this.render())})});let a=e.querySelector(`#btn-cancel-cat-edit`);a&&a.addEventListener(`click`,()=>{s.playClick(),this.editingCategory=null,this.render()});let c=e.querySelector(`#btn-save-cat-edit`);c&&c.addEventListener(`click`,()=>{s.playClick();let t=e.querySelector(`#cat-form-name`).value.trim(),n=e.querySelector(`#cat-form-icon`).value.trim()||`🎯`,r=e.querySelector(`#cat-form-desc`).value.trim();if(!t){alert(`Please enter a category name`);return}this.editingCategory.isNew?o.addCategory({name:t,icon:n,description:r}):o.updateCategory(this.editingCategory.id,{name:t,icon:n,description:r}),this.editingCategory=null,this.onSettingsSaved&&this.onSettingsSaved(),this.render()});let l=e.querySelector(`#questions-cat-filter`);l&&l.addEventListener(`change`,e=>{s.playClick(),this.selectedCatForQuestions=e.target.value,this.render()});let u=e.querySelector(`#btn-create-q-trigger`);u&&u.addEventListener(`click`,()=>{s.playClick();let e=this.selectedCatForQuestions===`all`?o.getCategories()[0]?.id||`taxonomy-systematics`:this.selectedCatForQuestions;this.editingQuestion={isNew:!0,category:e,answer:``,clues:{A:``,B:``,C:``,D:``},options:[``,``,``,``],explanation:``},this.render()}),e.querySelectorAll(`.btn-edit-q`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`),n=o.getQuestionById(t);n&&(s.playClick(),this.editingQuestion=JSON.parse(JSON.stringify(n)),this.render())})}),e.querySelectorAll(`.btn-delete-q`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`);confirm(`Delete this question?`)&&(s.playClick(),o.deleteQuestion(t),this.render())})});let d=e.querySelector(`#btn-cancel-q-edit`);d&&d.addEventListener(`click`,()=>{s.playClick(),this.editingQuestion=null,this.render()});let f=e.querySelector(`#btn-save-q-edit`);f&&f.addEventListener(`click`,()=>{s.playClick();let t=e.querySelector(`#q-form-category`).value,n=e.querySelector(`#q-form-answer`).value.trim(),r=e.querySelector(`#q-form-clue-a`).value.trim(),i=e.querySelector(`#q-form-clue-b`).value.trim(),a=e.querySelector(`#q-form-clue-c`).value.trim(),c=e.querySelector(`#q-form-clue-d`).value.trim(),l=e.querySelector(`#q-form-opt-0`).value.trim(),u=e.querySelector(`#q-form-opt-1`).value.trim(),d=e.querySelector(`#q-form-opt-2`).value.trim(),f=e.querySelector(`#q-form-opt-3`).value.trim(),p=e.querySelector(`#q-form-explanation`).value.trim();if(!n||!r||!i||!a||!c||!l||!u||!d||!f){alert(`Please fill in the answer, all 4 clues, and all 4 options.`);return}let m=[l,u,d,f];if(!m.some(e=>e.toLowerCase()===n.toLowerCase())){alert(`One of the 4 answer options must match the correct answer!`);return}let h={category:t,answer:n,clues:{A:r,B:i,C:a,D:c},options:m,correctOption:n,explanation:p};this.editingQuestion.isNew?o.addQuestion(h):o.updateQuestion(this.editingQuestion.id,h),this.editingQuestion=null,this.render()})}saveCurrentInputs(e){let t=o.getSettings(),n=e.querySelector(`#setting-timer-a`),r=e.querySelector(`#setting-timer-b`),i=e.querySelector(`#setting-timer-c`),a=e.querySelector(`#setting-timer-d`),c=e.querySelector(`#setting-points-a`),l=e.querySelector(`#setting-points-b`),u=e.querySelector(`#setting-points-c`),d=e.querySelector(`#setting-points-d`),f=e.querySelector(`#setting-q-count`);n&&(t.timerDurationA=Number(n.value)||20),r&&(t.timerDurationB=Number(r.value)||20),i&&(t.timerDurationC=Number(i.value)||20),a&&(t.timerDurationD=Number(a.value)||20),c&&(t.pointsA=Number(c.value)||4),l&&(t.pointsB=Number(l.value)||3),u&&(t.pointsC=Number(u.value)||2),d&&(t.pointsD=Number(d.value)||1),f&&(t.questionsPerGame=Number(f.value)||10);let p=e.querySelector(`#setting-player-name`),m=e.querySelector(`#setting-advance-delay`),h=e.querySelector(`#setting-reveal-d`),g=e.querySelector(`#setting-sound-enabled`);p&&(t.defaultPlayerName=p.value.trim()||`Detective Player`),m&&(t.autoAdvanceDelayMs=Number(m.value)||1600),h&&(t.revealAnswerOnD=h.checked),g&&(t.soundEnabled=g.checked,s.setEnabled(g.checked)),o.saveSettings(t)}},v=class{constructor(){this.mainContent=document.getElementById(`main-content`),this.engine=new e,this.currentView=null,this.gameViewComponent=null,this.playerEntryComponent=null,this.playerName=o.getCurrentPlayerName(),this.init()}init(){let e=o.getSettings();s.setEnabled(e.soundEnabled!==!1),this.updateSoundButton(),this.engine.subscribe(e=>{this.handleEngineState(e)}),this.setupHeaderActions(),this.setupHistoryHandling(),this.playerName?this.showCategorySelect():this.showPlayerEntry()}setupHistoryHandling(){window.addEventListener(`popstate`,e=>{this.currentView===`game`?confirm(`Are you sure you want to leave this quiz? Your current progress may be lost.`)?(this.engine.stopTimer(),this.showCategorySelect()):history.pushState({view:`game`},``,`#quiz`):this.currentView===`results`&&this.showCategorySelect()})}setupHeaderActions(){let e=document.getElementById(`brand-logo`);e&&e.addEventListener(`click`,()=>{this.currentView===`game`?confirm(`Are you sure you want to leave this quiz? Your current progress may be lost.`)&&(this.engine.stopTimer(),this.playerName?this.showCategorySelect():this.showPlayerEntry()):this.playerName?this.showCategorySelect():this.showPlayerEntry()});let t=document.getElementById(`header-player-pill`);t&&t.addEventListener(`click`,()=>{s.playClick(),confirm(`Change contestant from "${this.playerName}"?`)&&this.handleSwitchPlayer()});let n=document.getElementById(`btn-toggle-sound`);n&&n.addEventListener(`click`,()=>{let e=o.getSettings(),t=!e.soundEnabled;e.soundEnabled=t,o.saveSettings(e),s.setEnabled(t),s.playClick(),this.updateSoundButton()});let r=document.getElementById(`btn-open-scoreboard`);r&&r.addEventListener(`click`,()=>{s.playClick(),new g().render()});let i=document.getElementById(`btn-open-settings`);i&&i.addEventListener(`click`,()=>{s.playClick(),new _(null,()=>{this.currentView===`category`&&this.showCategorySelect()}).render()})}updateSoundButton(){let e=document.getElementById(`btn-toggle-sound`),t=o.getSettings();e&&(e.innerHTML=t.soundEnabled===!1?`🔇`:`🔊`,e.title=t.soundEnabled===!1?`Unmute Sound`:`Mute Sound`)}updateHeaderPlayer(){let e=document.getElementById(`header-player-pill`),t=document.getElementById(`header-player-name`);e&&t&&(this.playerName&&this.currentView!==`login`?(t.textContent=this.playerName,e.style.display=`inline-flex`):e.style.display=`none`)}showPlayerEntry(){this.cleanupCurrentView(),this.currentView=`login`,this.updateHeaderPlayer(),window.location.hash===`#quiz`&&history.replaceState({view:`login`},``,window.location.pathname),this.playerEntryComponent=new l(this.mainContent,e=>{this.playerName=e,o.setCurrentPlayerName(e),this.updateHeaderPlayer()},e=>{this.playerName=e,o.setCurrentPlayerName(e),this.showCategorySelect()}),this.playerEntryComponent.mount()}handleSwitchPlayer(){o.clearCurrentPlayerName(),this.playerName=``,this.updateHeaderPlayer(),this.showPlayerEntry()}showCategorySelect(){if(!this.playerName){this.showPlayerEntry();return}this.cleanupCurrentView(),this.currentView=`category`,this.updateHeaderPlayer(),window.location.hash===`#quiz`&&history.replaceState({view:`category`},``,window.location.pathname),new d(this.mainContent,e=>this.startGame(e),()=>{let e=new _(null,()=>this.showCategorySelect());e.activeTab=`categories`,e.editingCategory={isNew:!0,name:``,icon:`🎯`,description:``},e.render()},this.playerName,()=>this.handleSwitchPlayer()).render()}startGame(e){this.cleanupCurrentView(),this.currentView=`game`,history.pushState({view:`game`},``,`#quiz`);let t=o.getQuestions(),n=o.getSettings();this.engine.startQuiz(e,t,this.playerName||n.defaultPlayerName||`Detective Player`,n),this.gameViewComponent=new p(this.mainContent,this.engine,()=>this.showCategorySelect()),this.gameViewComponent.mount()}handleEngineState(e){if(this.currentView===`game`){if(e.isGameOver){let e=this.engine.getFinalStats();o.saveScore(e),this.showResults(e)}else this.gameViewComponent&&(e.eventType===`tick`?this.gameViewComponent.updateTimer(e.timeLeft,e.maxTimeForStage):this.gameViewComponent.render())}}showResults(e){this.cleanupCurrentView(),this.currentView=`results`,new h(this.mainContent,e,()=>{let t=o.getCategories().find(t=>t.id===e.categoryId);t?this.startGame(t):this.showCategorySelect()},()=>this.showCategorySelect(),()=>new g().render()).mount()}cleanupCurrentView(){this.gameViewComponent&&=(this.gameViewComponent.unmount(),null),this.playerEntryComponent&&=(this.playerEntryComponent.unmount(),null)}};typeof window<`u`&&(document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,()=>{new v}):new v);