let allEmojis = [
    '😀',
    '😁',
    '😂',
    '😃',
    '😄',
    '😅',
    '😆',
    '😇',
    '😈',
    '👿',
    '😉',
    '😊',
    '🙂',
    '😋',
    '😌',
    '😍',
    '😎',
    '😏',
    '😐',
    '😑',
    '😒',
    '😓',
    '😔',
    '😕',
    '😖',
    '😗',
    '😘',
    '😙',
    '😚',
    '😛',
    '😜',
    '😝',
    '😞',
    '😟',
    '😠',
    '😡',
    '😢',
    '😣',
    '😤',
    '😥',
    '😦',
    '😧',
    '😨',
    '😩',
    '😪',
    '😫',
    '😬',
    '😭',
    '😮',
    '😯',
    '😰',
    '😱',
    '😲',
    '😳',
    '😴',
    '😵',
    '😶',
    '😷',
    '😸',
    '😹',
    '😺',
    '😻',
    '😼',
    '😽',
    '😾',
    '😿',
    '🙀',
    '👣',
    '👤',
    '👥',
    '👶',
    '👶🏻',
    '👶🏼',
    '👶🏽',
    '👶🏾',
    '👶🏿',
    '👦',
    '👦🏻',
    '👦🏼',
    '👦🏽',
    '👦🏾',
    '👦🏿',
    '👧',
    '👧🏻',
    '👧🏼',
    '👧🏽',
    '👧🏾',
    '👧🏿',
    '👨',
    '👨🏻',
    '👨🏼',
    '👨🏽',
    '👨🏾',
    '👨🏿',
    '👩',
    '👩🏻',
    '👩🏼',
    '👩🏽',
    '👩🏾',
    '👩🏿',
    '👪',
    '👨‍👩‍👧',
    '👨‍👩‍👧‍👦',
    '👨‍👩‍👦‍👦',
    '👨‍👩‍👧‍👧',
    '👩‍👩‍👦',
    '👩‍👩‍👧',
    '👩‍👩‍👧‍👦',
    '👩‍👩‍👦‍👦',
    '👩‍👩‍👧‍👧',
    '👨‍👨‍👦',
    '👨‍👨‍👧',
    '👨‍👨‍👧‍👦',
    '👨‍👨‍👦‍👦',
    '👨‍👨‍👧‍👧',
    '👫',
    '👬',
    '👭',
    '👯',
    '👰',
    '👰🏻',
    '👰🏼',
    '👰🏽',
    '👰🏾',
    '👰🏿',
    '👱',
    '👱🏻',
    '👱🏼',
    '👱🏽',
    '👱🏾',
    '👱🏿',
    '👲',
    '👲🏻',
    '👲🏼',
    '👲🏽',
    '👲🏾',
    '👲🏿',
    '👳',
    '👳🏻',
    '👳🏼',
    '👳🏽',
    '👳🏾',
    '👳🏿',
    '👴',
    '👴🏻',
    '👴🏼',
    '👴🏽',
    '👴🏾',
    '👴🏿',
    '👵',
    '👵🏻',
    '👵🏼',
    '👵🏽',
    '👵🏾',
    '👵🏿',
    '👮',
    '👮🏻',
    '👮🏼',
    '👮🏽',
    '👮🏾',
    '👮🏿',
    '👷',
    '👷🏻',
    '👷🏼',
    '👷🏽',
    '👷🏾',
    '👷🏿',
    '👸',
    '👸🏻',
    '👸🏼',
    '👸🏽',
    '👸🏾',
    '👸🏿',
    '💂',
    '💂🏻',
    '💂🏼',
    '💂🏽',
    '💂🏾',
    '💂🏿',
    '👼',
    '👼🏻',
    '👼🏼',
    '👼🏽',
    '👼🏾',
    '👼🏿',
    '🎅',
    '🎅🏻',
    '🎅🏼',
    '🎅🏽',
    '🎅🏾',
    '🎅🏿',
    '👻',
    '👹',
    '👺',
    '💩',
    '💀',
    '👽',
    '👾',
    '🙇',
    '🙇🏻',
    '🙇🏼',
    '🙇🏽',
    '🙇🏾',
    '🙇🏿',
    '💁',
    '💁🏻',
    '💁🏼',
    '💁🏽',
    '💁🏾',
    '💁🏿',
    '🙅',
    '🙅🏻',
    '🙅🏼',
    '🙅🏽',
    '🙅🏾',
    '🙅🏿',
    '🙆',
    '🙆🏻',
    '🙆🏼',
    '🙆🏽',
    '🙆🏾',
    '🙆🏿',
    '🙋',
    '🙋🏻',
    '🙋🏼',
    '🙋🏽',
    '🙋🏾',
    '🙋🏿',
    '🙎',
    '🙎🏻',
    '🙎🏼',
    '🙎🏽',
    '🙎🏾',
    '🙎🏿',
    '🙍',
    '🙍🏻',
    '🙍🏼',
    '🙍🏽',
    '🙍🏾',
    '🙍🏿',
    '💆',
    '💆🏻',
    '💆🏼',
    '💆🏽',
    '💆🏾',
    '💆🏿',
    '💇',
    '💇🏻',
    '💇🏼',
    '💇🏽',
    '💇🏾',
    '💇🏿',
    '💑',
    '👩‍❤️‍👩',
    '👨‍❤️‍👨',
    '💏',
    '👩‍❤️‍💋‍👩',
    '👨‍❤️‍💋‍👨',
    '🙌',
    '🙌🏻',
    '🙌🏼',
    '🙌🏽',
    '🙌🏾',
    '🙌🏿',
    '👏',
    '👏🏻',
    '👏🏼',
    '👏🏽',
    '👏🏾',
    '👏🏿',
    '👂',
    '👂🏻',
    '👂🏼',
    '👂🏽',
    '👂🏾',
    '👂🏿',
    '👀',
    '👃',
    '👃🏻',
    '👃🏼',
    '👃🏽',
    '👃🏾',
    '👃🏿',
    '👄',
    '💋',
    '👅',
    '💅',
    '💅🏻',
    '💅🏼',
    '💅🏽',
    '💅🏾',
    '💅🏿',
    '👋',
    '👋🏻',
    '👋🏼',
    '👋🏽',
    '👋🏾',
    '👋🏿',
    '👍',
    '👍🏻',
    '👍🏼',
    '👍🏽',
    '👍🏾',
    '👍🏿',
    '👎',
    '👎🏻',
    '👎🏼',
    '👎🏽',
    '👎🏾',
    '👎🏿',
    '☝',
    '☝🏻',
    '☝🏼',
    '☝🏽',
    '☝🏾',
    '☝🏿',
    '👆',
    '👆🏻',
    '👆🏼',
    '👆🏽',
    '👆🏾',
    '👆🏿',
    '👇',
    '👇🏻',
    '👇🏼',
    '👇🏽',
    '👇🏾',
    '👇🏿',
    '👈',
    '👈🏻',
    '👈🏼',
    '👈🏽',
    '👈🏾',
    '👈🏿',
    '👉',
    '👉🏻',
    '👉🏼',
    '👉🏽',
    '👉🏾',
    '👉🏿',
    '👌',
    '👌🏻',
    '👌🏼',
    '👌🏽',
    '👌🏾',
    '👌🏿',
    '✌',
    '✌🏻',
    '✌🏼',
    '✌🏽',
    '✌🏾',
    '✌🏿',
    '👊',
    '👊🏻',
    '👊🏼',
    '👊🏽',
    '👊🏾',
    '👊🏿',
    '✊',
    '✊🏻',
    '✊🏼',
    '✊🏽',
    '✊🏾',
    '✊🏿',
    '✋',
    '✋🏻',
    '✋🏼',
    '✋🏽',
    '✋🏾',
    '✋🏿',
    '💪',
    '💪🏻',
    '💪🏼',
    '💪🏽',
    '💪🏾',
    '💪🏿',
    '👐',
    '👐🏻',
    '👐🏼',
    '👐🏽',
    '👐🏾',
    '👐🏿',
    '🙏',
    '🙏🏻',
    '🙏🏼',
    '🙏🏽',
    '🙏🏾',
    '🙏🏿',
    '🌱',
    '🌲',
    '🌳',
    '🌴',
    '🌵',
    '🌷',
    '🌸',
    '🌹',
    '🌺',
    '🌻',
    '🌼',
    '💐',
    '🌾',
    '🌿',
    '🍀',
    '🍁',
    '🍂',
    '🍃',
    '🍄',
    '🌰',
    '🐀',
    '🐁',
    '🐭',
    '🐹',
    '🐂',
    '🐃',
    '🐄',
    '🐮',
    '🐅',
    '🐆',
    '🐯',
    '🐇',
    '🐰',
    '🐈',
    '🐱',
    '🐎',
    '🐴',
    '🐏',
    '🐑',
    '🐐',
    '🐓',
    '🐔',
    '🐤',
    '🐣',
    '🐥',
    '🐦',
    '🐧',
    '🐘',
    '🐪',
    '🐫',
    '🐗',
    '🐖',
    '🐷',
    '🐽',
    '🐕',
    '🐩',
    '🐶',
    '🐺',
    '🐻',
    '🐨',
    '🐼',
    '🐵',
    '🙈',
    '🙉',
    '🙊',
    '🐒',
    '🐉',
    '🐲',
    '🐊',
    '🐍',
    '🐢',
    '🐸',
    '🐋',
    '🐳',
    '🐬',
    '🐙',
    '🐟',
    '🐠',
    '🐡',
    '🐚',
    '🐌',
    '🐛',
    '🐜',
    '🐝',
    '🐞',
    '🐾',
    '⚡️',
    '🔥',
    '🌙',
    '☀️',
    '⛅️',
    '☁️',
    '💧',
    '💦',
    '☔️',
    '💨',
    '❄️',
    '🌟',
    '⭐️',
    '🌠',
    '🌄',
    '🌅',
    '🌈',
    '🌊',
    '🌋',
    '🌌',
    '🗻',
    '🗾',
    '🌐',
    '🌍',
    '🌎',
    '🌏',
    '🌑',
    '🌒',
    '🌓',
    '🌔',
    '🌕',
    '🌖',
    '🌗',
    '🌘',
    '🌚',
    '🌝',
    '🌛',
    '🌜',
    '🌞',
    '🍅',
    '🍆',
    '🌽',
    '🍠',
    '🍇',
    '🍈',
    '🍉',
    '🍊',
    '🍋',
    '🍌',
    '🍍',
    '🍎',
    '🍏',
    '🍐',
    '🍑',
    '🍒',
    '🍓',
    '🍔',
    '🍕',
    '🍖',
    '🍗',
    '🍘',
    '🍙',
    '🍚',
    '🍛',
    '🍜',
    '🍝',
    '🍞',
    '🍟',
    '🍡',
    '🍢',
    '🍣',
    '🍤',
    '🍥',
    '🍦',
    '🍧',
    '🍨',
    '🍩',
    '🍪',
    '🍫',
    '🍬',
    '🍭',
    '🍮',
    '🍯',
    '🍰',
    '🍱',
    '🍲',
    '🍳',
    '🍴',
    '🍵',
    '☕️',
    '🍶',
    '🍷',
    '🍸',
    '🍹',
    '🍺',
    '🍻',
    '🍼',
    '🎀',
    '🎁',
    '🎂',
    '🎃',
    '🎄',
    '🎋',
    '🎍',
    '🎑',
    '🎆',
    '🎇',
    '🎉',
    '🎊',
    '🎈',
    '💫',
    '✨',
    '💥',
    '🎓',
    '👑',
    '🎎',
    '🎏',
    '🎐',
    '🎌',
    '🏮',
    '💍',
    '❤️',
    '💔',
    '💌',
    '💕',
    '💞',
    '💓',
    '💗',
    '💖',
    '💘',
    '💝',
    '💟',
    '💜',
    '💛',
    '💚',
    '💙',
    '🏃',
    '🏃🏻',
    '🏃🏼',
    '🏃🏽',
    '🏃🏾',
    '🏃🏿',
    '🚶',
    '🚶🏻',
    '🚶🏼',
    '🚶🏽',
    '🚶🏾',
    '🚶🏿',
    '💃',
    '💃🏻',
    '💃🏼',
    '💃🏽',
    '💃🏾',
    '💃🏿',
    '🚣',
    '🚣🏻',
    '🚣🏼',
    '🚣🏽',
    '🚣🏾',
    '🚣🏿',
    '🏊',
    '🏊🏻',
    '🏊🏼',
    '🏊🏽',
    '🏊🏾',
    '🏊🏿',
    '🏄',
    '🏄🏻',
    '🏄🏼',
    '🏄🏽',
    '🏄🏾',
    '🏄🏿',
    '🛀',
    '🛀🏻',
    '🛀🏼',
    '🛀🏽',
    '🛀🏾',
    '🛀🏿',
    '🏂',
    '🎿',
    '⛄️',
    '🚴',
    '🚴🏻',
    '🚴🏼',
    '🚴🏽',
    '🚴🏾',
    '🚴🏿',
    '🚵',
    '🚵🏻',
    '🚵🏼',
    '🚵🏽',
    '🚵🏾',
    '🚵🏿',
    '🏇',
    '🏇🏻',
    '🏇🏼',
    '🏇🏽',
    '🏇🏾',
    '🏇🏿',
    '⛺️',
    '🎣',
    '⚽️',
    '🏀',
    '🏈',
    '⚾️',
    '🎾',
    '🏉',
    '⛳️',
    '🏆',
    '🎽',
    '🏁',
    '🎹',
    '🎸',
    '🎻',
    '🎷',
    '🎺',
    '🎵',
    '🎶',
    '🎼',
    '🎧',
    '🎤',
    '🎭',
    '🎫',
    '🎩',
    '🎪',
    '🎬',
    '🎨',
    '🎯',
    '🎱',
    '🎳',
    '🎰',
    '🎲',
    '🎮',
    '🎴',
    '🃏',
    '🀄️',
    '🎠',
    '🎡',
    '🎢',
    '🚃',
    '🚞',
    '🚂',
    '🚋',
    '🚝',
    '🚄',
    '🚅',
    '🚆',
    '🚇',
    '🚈',
    '🚉',
    '🚊',
    '🚌',
    '🚍',
    '🚎',
    '🚐',
    '🚑',
    '🚒',
    '🚓',
    '🚔',
    '🚨',
    '🚕',
    '🚖',
    '🚗',
    '🚘',
    '🚙',
    '🚚',
    '🚛',
    '🚜',
    '🚲',
    '🚏',
    '⛽️',
    '🚧',
    '🚦',
    '🚥',
    '🚀',
    '🚁',
    '✈️',
    '💺',
    '⚓️',
    '🚢',
    '🚤',
    '⛵️',
    '🚡',
    '🚠',
    '🚟',
    '🛂',
    '🛃',
    '🛄',
    '🛅',
    '💴',
    '💶',
    '💷',
    '💵',
    '🗽',
    '🗿',
    '🌁',
    '🗼',
    '⛲️',
    '🏰',
    '🏯',
    '🌇',
    '🌆',
    '🌃',
    '🌉',
    '🏠',
    '🏡',
    '🏢',
    '🏬',
    '🏭',
    '🏣',
    '🏤',
    '🏥',
    '🏦',
    '🏨',
    '🏩',
    '💒',
    '⛪️',
    '🏪',
    '🏫',
    '🇦🇺',
    '🇦🇹',
    '🇧🇪',
    '🇧🇷',
    '🇨🇦',
    '🇨🇱',
    '🇨🇳',
    '🇨🇴',
    '🇩🇰',
    '🇫🇮',
    '🇫🇷',
    '🇩🇪',
    '🇭🇰',
    '🇮🇳',
    '🇮🇩',
    '🇮🇪',
    '🇮🇱',
    '🇮🇹',
    '🇯🇵',
    '🇰🇷',
    '🇲🇴',
    '🇲🇾',
    '🇲🇽',
    '🇳🇱',
    '🇳🇿',
    '🇳🇴',
    '🇵🇭',
    '🇵🇱',
    '🇵🇹',
    '🇵🇷',
    '🇷🇺',
    '🇸🇦',
    '🇸🇬',
    '🇿🇦',
    '🇪🇸',
    '🇸🇪',
    '🇨🇭',
    '🇹🇷',
    '🇬🇧',
    '🇺🇸',
    '🇦🇪',
    '🇻🇳',
    '⌚️',
    '📱',
    '📲',
    '💻',
    '⏰',
    '⏳',
    '⌛️',
    '📷',
    '📹',
    '🎥',
    '📺',
    '📻',
    '📟',
    '📞',
    '☎️',
    '📠',
    '💽',
    '💾',
    '💿',
    '📀',
    '📼',
    '🔋',
    '🔌',
    '💡',
    '🔦',
    '📡',
    '💳',
    '💸',
    '💰',
    '💎',
    '🌂',
    '👝',
    '👛',
    '👜',
    '💼',
    '🎒',
    '💄',
    '👓',
    '👒',
    '👡',
    '👠',
    '👢',
    '👞',
    '👟',
    '👙',
    '👗',
    '👘',
    '👚',
    '👕',
    '👔',
    '👖',
    '🚪',
    '🚿',
    '🛁',
    '🚽',
    '💈',
    '💉',
    '💊',
    '🔬',
    '🔭',
    '🔮',
    '🔧',
    '🔪',
    '🔩',
    '🔨',
    '💣',
    '🚬',
    '🔫',
    '🔖',
    '📰',
    '🔑',
    '✉️',
    '📩',
    '📨',
    '📧',
    '📥',
    '📤',
    '📦',
    '📯',
    '📮',
    '📪',
    '📫',
    '📬',
    '📭',
    '📄',
    '📃',
    '📑',
    '📈',
    '📉',
    '📊',
    '📅',
    '📆',
    '🔅',
    '🔆',
    '📜',
    '📋',
    '📖',
    '📓',
    '📔',
    '📒',
    '📕',
    '📗',
    '📘',
    '📙',
    '📚',
    '📇',
    '🔗',
    '📎',
    '📌',
    '✂️',
    '📐',
    '📍',
    '📏',
    '🚩',
    '📁',
    '📂',
    '✒️',
    '✏️',
    '📝',
    '🔏',
    '🔐',
    '🔒',
    '🔓',
    '📣',
    '📢',
    '🔈',
    '🔉',
    '🔊',
    '🔇',
    '💤',
    '🔔',
    '🔕',
    '💭',
    '💬',
    '🚸',
    '🔍',
    '🔎',
    '🚫',
    '⛔️',
    '📛',
    '🚷',
    '🚯',
    '🚳',
    '🚱',
    '📵',
    '🔞',
    '🉑',
    '🉐',
    '💮',
    '㊙️',
    '㊗️',
    '🈴',
    '🈵',
    '🈲',
    '🈶',
    '🈚️',
    '🈸',
    '🈺',
    '🈷',
    '🈹',
    '🈳',
    '🈂',
    '🈁',
    '🈯️',
    '💹',
    '❇️',
    '✳️',
    '❎',
    '✅',
    '✴️',
    '📳',
    '📴',
    '🆚',
    '🅰',
    '🅱',
    '🆎',
    '🆑',
    '🅾',
    '🆘',
    '🆔',
    '🅿️',
    '🚾',
    '🆒',
    '🆓',
    '🆕',
    '🆖',
    '🆗',
    '🆙',
    '🏧',
    '♈️',
    '♉️',
    '♊️',
    '♋️',
    '♌️',
    '♍️',
    '♎️',
    '♏️',
    '♐️',
    '♑️',
    '♒️',
    '♓️',
    '🚻',
    '🚹',
    '🚺',
    '🚼',
    '♿️',
    '🚰',
    '🚭',
    '🚮',
    '▶️',
    '◀️',
    '🔼',
    '🔽',
    '⏩',
    '⏪',
    '⏫',
    '⏬',
    '➡️',
    '⬅️',
    '⬆️',
    '⬇️',
    '↗️',
    '↘️',
    '↙️',
    '↖️',
    '↕️',
    '↔️',
    '🔄',
    '↪️',
    '↩️',
    '⤴️',
    '⤵️',
    '🔀',
    '🔁',
    '🔂',
    '#⃣',
    '0⃣',
    '1⃣',
    '2⃣',
    '3⃣',
    '4⃣',
    '5⃣',
    '6⃣',
    '7⃣',
    '8⃣',
    '9⃣',
    '🔟',
    '🔢',
    '🔤',
    '🔡',
    '🔠',
    'ℹ️',
    '📶',
    '🎦',
    '🔣',
    '➕',
    '➖',
    '〰',
    '➗',
    '✖️',
    '✔️',
    '🔃',
    '™',
    '©',
    '®',
    '💱',
    '💲',
    '➰',
    '➿',
    '〽️',
    '❗️',
    '❓',
    '❕',
    '❔',
    '‼️',
    '⁉️',
    '❌',
    '⭕️',
    '💯',
    '🔚',
    '🔙',
    '🔛',
    '🔝',
    '🔜',
    '🌀',
    'Ⓜ️',
    '⛎',
    '🔯',
    '🔰',
    '🔱',
    '⚠️',
    '♨️',
    '♻️',
    '💢',
    '💠',
    '♠️',
    '♣️',
    '♥️',
    '♦️',
    '☑️',
    '⚪️',
    '⚫️',
    '🔘',
    '🔴',
    '🔵',
    '🔺',
    '🔻',
    '🔸',
    '🔹',
    '🔶',
    '🔷',
    '▪️',
    '▫️',
    '⬛️',
    '⬜️',
    '◼️',
    '◻️',
    '◾️',
    '◽️',
    '🔲',
    '🔳',
    '🕐',
    '🕑',
    '🕒',
    '🕓',
    '🕔',
    '🕕',
    '🕖',
    '🕗',
    '🕘',
    '🕙',
    '🕚',
    '🕛',
    '🕜',
    '🕝',
    '🕞',
    '🕟',
    '🕠',
    '🕡',
    '🕢',
    '🕣',
    '🕤',
    '🕥',
    '🕦',
    '🕧',
];
let smileys = allEmojis.slice(0, 56);

export { smileys };
