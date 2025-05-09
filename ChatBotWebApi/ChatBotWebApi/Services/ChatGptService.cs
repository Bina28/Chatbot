using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using ChatBotWebApi;
using ChatBotWebApi.Services;
using Microsoft.Extensions.Options;
public class ChatGptService : IChatGptService
{
	private readonly OpenAiConfig _openAiConfig;
	private readonly HttpClient _httpClient;

	public ChatGptService(IOptionsMonitor<OpenAiConfig> optionsMonitor)
	{
		_openAiConfig = optionsMonitor.CurrentValue;
		_httpClient = new HttpClient();
	
		_httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _openAiConfig.ApiKey);
	
	}

	public async Task<string> GetResponseAsync(string userMessage)
	{
		var requestBody = new
		{
			model = _openAiConfig.Model, 
			messages = new[]
			{
				new { role = "user", content = userMessage }
			}
		};

		var jsonContent = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");

		var response = await _httpClient.PostAsync(_openAiConfig.ApiUrl, jsonContent);
		var responseContent = await response.Content.ReadAsStringAsync();

		Console.WriteLine(responseContent); 

		response.EnsureSuccessStatusCode();

		var json = JsonNode.Parse(responseContent);
		var botReply = json?["choices"]?[0]?["message"]?["content"]?.ToString();

		return botReply ?? "No response";
	}
}
