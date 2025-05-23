using WebApplication1.Models;
using System.Collections.Generic;

namespace WebApplication1.Data
{
    public static class BookContext
    {
        public static List<Book> Books { get; set; } = new List<Book>();
    }
}
