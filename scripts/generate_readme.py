import json
import shutil
import urllib.parse


def generate_badges(tags):
    # Generates safe markdown badges for the README
    badges = []
    for tag in tags:
        safe_tag = urllib.parse.quote(tag.replace("-", " "))
        badges.append(f"![](https://img.shields.io/badge/{safe_tag}-blue)")
    return " ".join(badges)


def main():
    # 1. Load data
    with open("data/resources.json", "r", encoding="utf-8") as f:
        resources = json.load(f)

    # 2. Copy JSON to docs for the frontend to fetch
    shutil.copy("data/resources.json", "docs/resources.json")

    # 3. Generate README content
    md = [
        "# Learning Resources\n",
        "A curated directory for software engineering and computer science.\n",
        "**[🌐 Visit the Searchable Directory](https://jigyansunanda.github.io/learning-resources/)**\n",
        "> [!NOTE]\n",
        "> This README is auto-generated. To add a resource, edit the `data/resources.json`.\n",
        "## Recent Additions\n",
        "| Resource | Tags | Notes |",
        "|---|---|---|",
    ]

    for item in resources:
        badges = generate_badges(item.get("tags", []))
        row = f"| [{item['name']}]({item['url']}) | {badges} | {item['notes']} |"
        md.append(row)

    with open("README.md", "w", encoding="utf-8") as f:
        f.write("\n".join(md))
        f.write("\n")


if __name__ == "__main__":
    main()
