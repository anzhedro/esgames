package hat

var Dictionaries = map[Language]map[Difficulty][]string{
	En: {
		Easy: []string{
			"account", "act", "action", "actor", "addition", "afternoon", "age", "air",
			"airplane", "airport", "alarm", "alphabet", "amount", "anchor", "angel", "anger",
			"angle", "animal", "answer", "ant", "apple", "arch", "argument", "arithmetic",
			"arm", "army", "art", "attack", "aunt", "baby", "back", "bad",
			"bag", "balance", "ball", "balloon", "banana", "band", "bang", "base",
			"baseball", "basin", "basket", "basketball", "bat", "bath", "battle", "bay",
			"bean", "bear", "bed", "bedroom", "bee", "beef", "beginner", "bell",
			"belt", "berry", "bible", "bike", "bird", "birth", "birthday", "bit",
			"bite", "blast", "blood", "boar", "board", "boat", "body", "bomb",
			"bone", "book", "boot", "border", "bottle", "box", "boy", "brain",
			"brake", "bread", "breakfast", "breath", "brick", "bridge", "brother", "brush",
			"bubble", "bucket", "building", "bun", "business", "butter", "button", "cable",
			"cactus", "cake", "calculator", "calendar", "call", "camera", "camp", "can",
			"canvas", "cap", "car", "card", "care", "carriage", "carrot", "cart",
			"cat", "cave", "cent", "center", "chain", "chair", "chalk", "change",
			"channel", "cheese", "cherry", "chest", "chicken", "chief", "child", "chin",
			"church", "circle", "city", "class", "clock", "cloth", "cloud", "clover",
			"club", "coat", "coffee", "cold", "collar", "color", "colour", "comb",
			"company", "connection", "control", "cook", "copy", "corn", "cotton", "country",
			"cover", "cow", "crack", "cream", "creator", "credit", "crime", "crown",
			"cry", "cub", "cup", "curve", "dad", "dam", "damage", "danger",
			"darkness", "daughter", "day", "dead", "death", "debt", "demon", "design",
			"desk", "dinner", "dinosaur", "dirt", "display", "doctor", "dog", "doll",
			"donkey", "doom", "door", "down", "dragon", "dream", "dreamer", "dress",
			"drink", "driving", "drop", "drum", "duck", "dust", "ear", "earth",
			"east", "edition", "education", "effect", "egg", "elbow", "emotion", "end",
			"error", "event", "example", "expert", "eye", "face", "fact", "factory",
			"faculty", "fall", "family", "fan", "fanatic", "farm", "farmer", "fat",
			"father", "fear", "feather", "feeling", "female", "field", "fight", "finger",
			"fire", "fireman", "fish", "flag", "flat", "flight", "floor", "flower",
			"fly", "fog", "folder", "food", "foot", "force", "fork", "form",
			"forward", "fox", "frame", "freak", "friend", "frog", "front", "fruit",
			"full", "future", "game", "garden", "gate", "general", "genetics", "geography",
			"ghost", "gift", "giraffe", "girl", "glass", "glove", "glue", "gold",
			"goldfish", "good", "goose", "grade", "grandfather", "grandmother", "grape", "grass",
			"ground", "group", "guitar", "gulf", "gun", "hair", "haircut", "hall",
			"hand", "hard", "hat", "hate", "head", "health", "heart", "height",
			"help", "hen", "hill", "history", "hobby", "hole", "holiday", "home",
			"honey", "hope", "horn", "horror", "horse", "hospital", "hostess", "hour",
			"house", "hug", "humor", "humour", "hunter", "husband", "ice", "idea",
			"ill", "insect", "instrument", "iron", "island", "jackdaw", "jam", "jar",
			"jazz", "jeans", "jewel", "joke", "journey", "joy", "judge", "juice",
			"jump", "kettle", "key", "keyboard", "kick", "kind", "kiss", "kitten",
			"knee", "knife", "lake", "lamp", "land", "language", "laugh", "law",
			"leaf", "learning", "leather", "leg", "letter", "level", "library", "life",
			"lift", "light", "limit", "line", "linen", "lip", "liquid", "list",
			"lock", "look", "loss", "love", "low", "lunch", "lunchroom", "lynx",
			"machine", "mage", "mailbox", "male", "man", "manager", "map", "mark",
			"market", "mask", "master", "material", "meal", "meat", "meeting", "memory",
			"message", "metal", "middle", "milk", "mind", "mint", "minute", "mirror",
			"mist", "mixer", "model", "money", "monkey", "month", "moon", "morning",
			"mother", "motion", "mountain", "mouse", "mouth", "move", "muscle", "music",
			"nail", "name", "neck", "need", "needle", "nerve", "net", "news",
			"night", "nipple", "noise", "noodle", "north", "nose", "note", "notebook",
			"noun", "number", "nut", "ocean", "office", "oil", "onion", "orange",
			"order", "owl", "owner", "page", "pain", "paint", "palm", "pan",
			"pancake", "paper", "parallel", "parent", "park", "part", "party", "passenger",
			"past", "peace", "peach", "pear", "pen", "pencil", "person", "pet",
			"picture", "pie", "pig", "pin", "pipe", "pizza", "plant", "plate",
			"pocket", "point", "poison", "police", "polish", "popcorn", "port", "position",
			"pot", "potato", "power", "present", "price", "princess", "print", "printer",
			"prison", "process", "property", "prose", "protest", "purpose", "quality", "queen",
			"question", "quiet", "rabbit", "race", "racket", "radio", "rain", "rainstorm",
			"ram", "rat", "rate", "ray", "reading", "record", "rectangle", "rent",
			"rice", "ride", "right", "ring", "river", "road", "rock", "rod",
			"roof", "room", "root", "rope", "rose", "round", "rule", "salt",
			"sand", "sausage", "scarf", "scene", "school", "science", "scissors", "sea",
			"seagull", "seat", "secret", "seed", "sex", "shape", "sheep", "sheet",
			"shelf", "ship", "shirt", "shock", "shoe", "shop", "show", "side",
			"sign", "silk", "silver", "sink", "sister", "site", "size", "skin",
			"skirt", "sky", "slipper", "smash", "smell", "smile", "smoke", "snail",
			"snake", "snow", "soap", "sock", "soda", "sofa", "son", "song",
			"sort", "sound", "soup", "south", "space", "spirit", "sponge", "spoon",
			"spring", "spy", "square", "squirrel", "stage", "stake", "stamp", "star",
			"start", "state", "station", "steak", "steam", "steel", "stem", "step",
			"stick", "stone", "stop", "store", "story", "strap", "stream", "street",
			"string", "sugar", "summer", "sun", "supper", "sweater", "sweet", "swim",
			"t-shirt", "table", "tail", "tank", "tape", "task", "taste", "tax",
			"taxi", "tea", "team", "telephone", "template", "tent", "territory", "test",
			"thing", "throne", "thumb", "ticket", "tiger", "time", "title", "tomorrow",
			"tongue", "tooth", "toothpaste", "top", "touch", "town", "toy", "track",
			"train", "transport", "trap", "tree", "triangle", "trip", "turn", "twist",
			"umbrella", "uncle", "unit", "use", "vacation", "value", "van", "vase",
			"vegetable", "verb", "view", "visitor", "voice", "void", "volcano", "volleyball",
			"voyage", "walk", "wall", "war", "wash", "watch", "water", "wave",
			"way", "weather", "week", "weight", "well", "west", "wheel", "wind",
			"window", "wine", "wing", "winter", "wish", "wizard", "wolf", "woman",
			"wood", "wool", "word", "work", "world", "worm", "writer", "writing",
			"yard", "year", "yesterday", "zebra", "zoo",
		},
		Medium: []string{
			"abbreviation", "accident", "achievement", "achiever", "acid", "activity", "addiction", "adjustment",
			"advertisement", "agony", "agreement", "alley", "amusement", "apartment", "apparatus", "apprentice",
			"approval", "area", "arrangement", "arrival", "assassin", "attempt", "attention", "attraction",
			"authority", "bait", "bead", "beam", "beast", "beetle", "beggar", "behaviour",
			"belief", "bent", "bitter", "blade", "bloodlust", "blow", "bodyguard", "boiling",
			"boundary", "branch", "broadsword", "bruise", "bulb", "burn", "bush", "cabbage",
			"caption", "carpenter", "cast", "cattle", "cause", "cavern", "cellar", "cemetery",
			"chance", "charge", "charger", "chemical", "chess", "clam", "clarity", "classification",
			"cleric", "coach", "coal", "coast", "cobweb", "cocktail", "coil", "comfort",
			"committee", "comparison", "competition", "complex", "condition", "copper", "cord", "cork",
			"cough", "cracker", "crayon", "creature", "crib", "crook", "crow", "crowd",
			"crush", "curiosity", "current", "curtain", "cushion", "dame", "decade", "decision",
			"decrease", "deep", "deer", "defence", "degree", "deliverer", "demigod", "demonology",
			"desire", "destruction", "detail", "development", "dictionary", "direction", "discovery", "discussion",
			"disease", "disgust", "disposition", "disproportion", "distance", "division", "dock", "dormitory",
			"doubt", "downtown", "drawer", "drizzle", "drug", "duel", "duration", "ease",
			"edge", "engine", "entity", "erection", "essense", "estimate", "exchange", "existence",
			"experience", "exploration", "facility", "failure", "fair", "fang", "feast", "fighter",
			"figure", "flame", "flavor", "flesh", "flint", "fold", "fortification", "fowl",
			"freedom", "friendship", "fuel", "furniture", "fuss", "gemstone", "gene", "gibberish",
			"goal", "goat", "goggles", "goo", "government", "grain", "grip", "growth",
			"guess", "guide", "guy", "hammer", "happiness", "harm", "harmony", "harp",
			"hearing", "heat", "hexagon", "hitman", "hook", "hose", "iceman", "icicle",
			"impulse", "inactivity", "income", "increase", "industry", "ink", "inspiration", "insurance",
			"interest", "invention", "jail", "jelly", "jellyfish", "job", "kite", "knot",
			"knowledge", "ladybug", "lash", "lawyer", "lead", "librarian", "living", "lizard",
			"loaf", "locket", "locomotion", "lyrics", "magic", "maid", "manliness", "marble",
			"mass", "match", "mathematician", "maul", "measure", "military", "mine", "minister",
			"mistress", "mitten", "mobster", "monstrosity", "movement", "movie", "mushroom", "nation",
			"negativity", "nest", "oatmeal", "object", "offer", "operation", "opinion", "opponent",
			"opportunity", "opposite", "organization", "ornament", "oven", "pail", "palace", "paragraph",
			"parcel", "partner", "passivity", "patch", "payment", "personality", "pest", "pineapple",
			"place", "plane", "plantation", "plastic", "platform", "playground", "pleasure", "plot",
			"plough", "politician", "pollution", "porter", "possession", "possibility", "powder", "prayer",
			"preparation", "presentation", "problem", "produce", "profit", "promise", "public", "pump",
			"punch", "punishment", "quicksand", "rail", "railway", "rake", "range", "reaction",
			"reaper", "reason", "receipt", "receiver", "recovery", "reference", "regeneration", "region",
			"regret", "rejection", "religion", "representative", "rescuer", "research", "rest", "restaurant",
			"reward", "rhythm", "riddle", "robin", "roll", "route", "rub", "rubble",
			"rumour", "sack", "safe", "sail", "satisfaction", "scale", "scent", "scourge",
			"screw", "secretary", "selection", "sense", "servant", "shade", "shadow", "shake",
			"shame", "sickle", "sight", "skate", "slave", "slope", "sneeze", "solid",
			"solution", "soul", "spade", "spark", "speech", "spiritualism", "spot", "statement",
			"stitch", "stocking", "stomach", "stove", "stranger", "straw", "strength", "structure",
			"style", "sudden", "suit", "surfing", "surprise", "swing", "symmetry", "system",
			"talk", "target", "teaching", "temper", "temple", "term", "texture", "theatre",
			"theory", "thong", "thread", "thrill", "throat", "thunder", "tie", "tin",
			"toad", "toe", "toothbrush", "trade", "trail", "tramp", "tray", "trick",
			"triplet", "triplets", "trouble", "trousers", "truck", "truth", "tub", "turkey",
			"twig", "ugliness", "understanding", "underwear", "unicorn", "urge", "usage", "vanity",
			"vein", "verse", "version", "vest", "violet", "waiting", "warning", "warrior",
			"waste", "waterfall", "wax", "werewolf", "whip", "whistle", "wilderness", "windowsill",
			"wound", "wrist", "yak", "yam", "zephyr", "zinc", "zipper",
		},
		Hard: []string{
			"abandonment", "acoustics", "adrenalin", "advantage",
			"advice", "afterthought", "announcement", "apparel",
			"appeal", "appliance", "application", "arrogance",
			"assertion", "assumption", "ataxia", "awkwardness",
			"badge", "behavior", "bestiary", "bibliogrphy",
			"brass", "breach", "burst", "butcher",
			"cannon", "caution", "certainty", "circumstance",
			"clarification", "comprehension", "confirmation", "consequence",
			"context", "credibility", "declaration", "defiance",
			"definition", "departure", "destination", "digestion",
			"discretion", "disdain", "distribution", "drain",
			"earthquake", "ember", "embrace", "endeavor",
			"entrepreneurship", "eradication", "expansion", "expression",
			"faucet", "favour", "feature", "fiction",
			"flock", "fragility", "friction", "frustration",
			"gambler", "governor", "hanging", "harbor",
			"harbour", "hollow", "hooker", "humiliation",
			"hydrant", "identity", "incrustation", "inertness",
			"insight", "intention", "lace", "lumber",
			"meaning", "membership", "moustache", "notification",
			"novacane", "objective", "observation", "obviousness",
			"opposition", "parameter", "perspicacity", "pickle",
			"preference", "prudence", "quarterstaff", "quartz",
			"quaterstaff", "quill", "quilt", "quiver",
			"recess", "recognition", "reflection", "relation",
			"reliability", "request", "resistance", "respect",
			"rifle", "salvation", "scarecrow", "sidewalk",
			"sleet", "sobriety", "society", "stretch",
			"substance", "suggestion", "superciliousness", "support",
			"survivability", "suspense", "templar", "tendency",
			"thought", "transparency", "treasure", "treatment",
			"veil", "vessel", "violence", "wealth",
			"wire", "wrench", "yarn", "zealot",
		},
	},
	Ru: {
		Easy: []string{
			"связь", "сметана", "шпроты", "ступня", "фотография", "помидор", "багет", "баржа",
			"бедро", "вибрация", "зверинец", "зависть", "мармелад", "негатив", "всплеск", "горошина",
			"кипятильник", "монастырь", "люкс", "величество", "бульон", "этаж", "скорпион", "земляника",
			"тефтели", "бриз", "дикарь", "банкомат", "лето", "прямоугольник", "шарманка", "ножницы",
			"врата", "грипп", "болото", "вандализм", "береста", "свадьба", "вторник", "цинга",
			"уют", "королева", "клуб", "фотоаппарат", "насилие", "ничья", "меч", "губка",
			"пример", "инициалы", "сантехника", "дудка", "продюссер", "общение", "пари", "лизун",
			"группа", "воспитанник", "звук", "след", "академик", "интеграл", "коридор", "тактика",
			"сафари", "молоко", "измельчение", "ожерелье", "канализация", "сыр", "шорты", "курага",
			"серия", "беда", "гнев", "галоп", "занавеска", "дед", "пароход", "сокол",
			"вожатый", "матрос", "кофемолка", "томат",
		},
		Medium: []string{
			"инквизитор", "распятие", "обозрение", "кульминация", "министерство", "поселение", "крикет", "оскомина",
			"балалаечник", "мотылёк", "радиотелефон", "миндаль", "распределение", "щёлочь", "сервировка", "маршал",
			"лайнер", "разгадка", "шматок", "обвинитель", "психопат", "амуниция", "требуха", "яйцеклетка",
			"сарафан", "выступление", "нокаут", "прикуп", "голубятник", "ворчун", "объединение", "увечье",
			"литератор", "чаяние", "подробность", "флюиды", "сказитель", "содержанка", "слалом", "туфта",
			"музыковед", "удушье", "услада", "постановщик", "физиолог", "экватор", "кочевник", "семинар",
			"странность", "секундант", "сочинительство", "носоглотка", "штукатур", "кукольник", "дарование", "магнат",
			"каретка", "артрит", "обозреватель", "крепостник", "представление", "производная", "стыдоба", "муравьед",
			"мачеха", "медведка", "подсознание", "гавань", "нумизматика", "перевес", "граф", "притопывание",
			"укладчик", "подголовник", "слизняк", "сертификат", "добряк", "шатёр", "циркуляция", "приватизация",
			"теплотехник", "прикол", "трубочист", "скетч",
		},
		Hard: []string{
			"магистраль", "багор", "неваляшка", "шёлкопрядение", "бенуар", "махорка", "сомнамбула", "фелинология",
			"инаугурация", "затейник", "вегетация", "стетоскоп", "мамалыга", "мичман", "закладчик", "кляузник",
			"кашне", "верньер", "фагот", "гуманист", "мадера", "провинциализм", "баловник", "пращур",
			"баньян", "контрреволюционер", "текстология", "лжесвидетель", "хитросплетение", "эклектика", "эхолокатор", "пасынок",
			"октет", "гангстеризм", "полузабытьё", "антропогенез", "крепдешин", "сбитень", "сентименталист", "поволока",
			"апломб", "бумагомаратель", "комиссар", "кооперация", "увещевание", "углекислота", "апробация", "гардина",
			"фолиант", "патока", "портшез", "морзянка", "померанец", "разночинец", "бурун", "глухомань",
			"кумпол", "брандспойт", "благовремение", "эклектик", "водораздел", "перфокарта", "запустение", "геронтолог",
			"лоханка", "гипертрофия", "квантор", "гидросфера", "шелкопряд", "выскабливание", "паноптикум", "абхарца",
			"дихотомия", "булат", "зазубрина", "перипетия", "инсинуация", "говенье", "гипертония", "парадигма",
			"бондарь", "непоседа", "нематода", "поварёнок",
		},
	},
}

type Word struct {
	Word       string
	Difficulty Difficulty
}