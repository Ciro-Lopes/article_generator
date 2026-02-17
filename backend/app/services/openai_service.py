from openai import OpenAI
from ..config import settings

client = OpenAI(api_key=settings.openai_api_key)


def generate_article(prompt: str, keywords: str = None, tone: str = "professional", length: str = "medium") -> dict:
    """Generate an article using OpenAI API"""
    
    # Define length in words
    length_map = {
        "short": "500-700",
        "medium": "1000-1500",
        "long": "2000-3000"
    }
    word_count = length_map.get(length, "1000-1500")
    
    # Build the system prompt
    system_prompt = f"""You are a professional content writer specializing in creating high-quality articles for WordPress blogs.
Write in a {tone} tone and create content that is engaging, well-structured, and SEO-friendly.
The article should be approximately {word_count} words."""
    
    # Build the user prompt
    user_prompt = f"Write a complete article about: {prompt}"
    if keywords:
        user_prompt += f"\n\nInclude these keywords naturally: {keywords}"
    
    user_prompt += "\n\nProvide the article with a clear title and well-structured content with proper HTML formatting (headings, paragraphs, lists, etc.)."
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.7,
            max_tokens=3000
        )
        
        content = response.choices[0].message.content

        # Remove markdown code blocks (e.g. ```html ... ```)
        import re
        clean_content = re.sub(r'^```[a-zA-Z]*\n?', '', content.strip(), flags=re.IGNORECASE)
        clean_content = re.sub(r'\n?```$', '', clean_content.strip())

        # Try to extract title from <h1> tag first, then from first # heading, then first line
        h1_match = re.search(r'<h1[^>]*>(.*?)</h1>', clean_content, re.IGNORECASE | re.DOTALL)
        md_heading_match = re.match(r'^#{1,2}\s+(.+)', clean_content)

        if h1_match:
            title = re.sub(r'<[^>]+>', '', h1_match.group(1)).strip()
        elif md_heading_match:
            title = md_heading_match.group(1).strip()
        else:
            lines = clean_content.split('\n')
            title = lines[0].replace('#', '').strip() if lines else "Untitled Article"

        article_content = clean_content
        
        return {
            "title": title,
            "content": article_content,
            "success": True
        }
    
    except Exception as e:
        return {
            "title": "",
            "content": "",
            "success": False,
            "error": str(e)
        }
