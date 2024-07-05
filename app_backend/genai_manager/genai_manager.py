from dotenv import load_dotenv
import google.generativeai as genai
import os


class GenAIManager:
    def __init__(self, text, type, formality):
        self.text = text
        types = [
            "narrative", "descriptive", "expository", "persuasive",
            "creative", "objective", "subjective", "review", "poetric",
            "technical",
        ]
        formalities = ["formal", "semi-formal", "informal"]
        
        self.type = types[type]
        self.formality = formalities[formality]

        load_dotenv()
        genai.configure(api_key=os.getenv("GENAI_API_KEY"))
        self.model = genai.GenerativeModel("gemini-1.5-pro")

    def chain_prompt_call(self):
        corrected_text = self.load_grammar_check()
        res = self.load_style_check(text=corrected_text)
        return res

    def get_ai_response(self, prompt):
        response = self.model.generate_content(prompt)
        return response.text

    def load_grammar_check(self):
        prompt = ""
        with open("genai_manager/grammar_check.txt", "r+") as file:
            prompt = f"Task: {file.read()}\n body: {self.text}"
        return self.get_ai_response(prompt)

    def load_style_check(self, text):
        writing_type = f"Type of writing: {self.type}"
        formal_level = f"Formality level: {self.formality}"
        body = f"Text:\n {text}"
        task = ""
        with open("genai_manager/style_check.txt", "r+") as file:
            task = file.read()

        prompt = f"""
        {writing_type} \n
        {formal_level} \n\n
        {body}\n\n
        {task} 
        """

        return self.get_ai_response(prompt)


def test_genai_manager():
    manager = GenAIManager(
        """
        Our team manages projects using GitHub Issues, pull requests, and GitHub Projects. We adopts the Scrum Agile principles in my project managements. 
        In addition, We haveve also sat up CI/CD automated pipelines with GitHub Actions to streamline the development, integration and deployment of the application.
        """,
        1, 0
    )

    return manager.chain_prompt_call()


if __name__ == "__main__":
    print(test_genai_manager())
