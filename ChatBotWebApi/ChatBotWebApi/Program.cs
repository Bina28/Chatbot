using ChatBotWebApi;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddAuthorization(); 

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<OpenAiConfig>(builder.Configuration.GetSection("OpenAI"));

builder.Services.AddSingleton<ChatGptService>();

builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowFrontend",
		policy => policy.WithOrigins("http://localhost:3000")
					  .AllowAnyHeader()
					  .AllowAnyMethod());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthorization();
app.MapControllers();

app.Run();
