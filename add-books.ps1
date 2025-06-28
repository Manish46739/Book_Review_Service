# Run this script in PowerShell to add 10 books to your API
# Make sure your server is running at http://localhost:3000

$books = @(
    @{ title = "The Pragmatic Programmer"; author = "Andrew Hunt" },
    @{ title = "Clean Code"; author = "Robert C. Martin" },
    @{ title = "You Don't Know JS"; author = "Kyle Simpson" },
    @{ title = "Refactoring"; author = "Martin Fowler" },
    @{ title = "Design Patterns"; author = "Erich Gamma" },
    @{ title = "JavaScript: The Good Parts"; author = "Douglas Crockford" },
    @{ title = "Introduction to Algorithms"; author = "Thomas H. Cormen" },
    @{ title = "Effective Java"; author = "Joshua Bloch" },
    @{ title = "Head First Design Patterns"; author = "Eric Freeman" },
    @{ title = "Domain-Driven Design"; author = "Eric Evans" }
)

foreach ($book in $books) {
    $json = $book | ConvertTo-Json
    Invoke-RestMethod -Uri "http://localhost:3000/books" -Method Post -Body $json -ContentType "application/json"
    Write-Host "Added: $($book.title)"
}
