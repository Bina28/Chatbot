namespace ChatBotWebApi.Services;

public interface IChatGptService{
	Task<string> GetResponseAsync(string userMessage);
}
