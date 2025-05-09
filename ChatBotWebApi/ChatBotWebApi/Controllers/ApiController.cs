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
		var response = await _chatService.GetResponseAsync(request.Message);
		return Ok(new { response });
	}
}





