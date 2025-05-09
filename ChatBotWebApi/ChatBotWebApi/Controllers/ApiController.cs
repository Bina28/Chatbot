using ChatBotWebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace ChatBotWebApi.Controllers;

[ApiController]
[Route("api/chat")]
public class ChatController : ControllerBase
{
	private readonly ChatGptService _chatService;

	public ChatController(ChatGptService chatService)
	{
		_chatService = chatService;
	}

	[HttpPost]
	public async Task<IActionResult> Post([FromBody] ChatRequest request)
	{
		// Simple validation example: check if message is null or empty
		if (string.IsNullOrWhiteSpace(request.Message))
		{
			return BadRequest(new { error = "Message cannot be empty." });
		}

		var response = await _chatService.GetResponseAsync(request.Message);
		return Ok(new { response });
	}
}





