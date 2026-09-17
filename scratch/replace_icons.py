import re

emoji_to_icon = {
    '"🤖"': "Bot",
    '"🧠"': "Brain",
    '"✨"': "Sparkles",
    '"✍️"': "PenTool",
    '"📝"': "FileText",
    '"📋"': "Clipboard",
    '"🎨"': "Palette",
    '"🖼️"': "Image",
    '"🌀"': "RefreshCcw",
    '"🎭"': "VenetianMask",
    '"💡"': "Lightbulb",
    '"👨‍💻"': "Terminal",
    '"⚡"': "Zap",
    '"🔧"': "Wrench",
    '"🎯"': "Target",
    '"⌨️"': "Keyboard",
    '"🎬"': "Clapperboard",
    '"🎙️"': "Mic",
    '"🎧"': "Headphones",
    '"🎵"': "Music",
    '"📹"': "Video",
    '"📓"': "Book",
    '"🔍"': "Search",
    '"📊"': "BarChart",
    '"⚙️"': "Settings",
    '"🖌️"': "Brush",
    '"🔥"': "Flame",
    '"✂️"': "Scissors",
    '"🔬"': "Microscope",
    '"📚"': "Library",
    '"📖"': "BookOpen",
    '"🎓"': "GraduationCap",
    '"📐"': "Ruler",
    '"🦉"': "Bird",
    '"🃏"': "Layers",
    '"🧮"': "Calculator"
}

with open("src/data/tools.ts", "r") as f:
    content = f.read()

# Replace icon: string with icon: LucideIcon
content = content.replace("icon: string;", "icon: LucideIcon;")

# Add imports for the new icons
icons = set(emoji_to_icon.values())
import_str = "import { \n  " + ", ".join(icons) + "\n} from 'lucide-react';\n"
content = import_str + content

# Replace each emoji with the icon component
for emoji, icon in emoji_to_icon.items():
    content = content.replace(f"icon: {emoji}", f"icon: {icon}")

with open("src/data/tools.ts", "w") as f:
    f.write(content)
