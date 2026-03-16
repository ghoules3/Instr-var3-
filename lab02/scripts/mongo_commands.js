use streaming_db

db.movies_meta.drop()

db.movies_meta.insertMany([
  {
    movie_id: "m001",
    title: "The Shawshank Redemption",
    year: 1994,
    runtime: 142,
    rating: 9.3,
    comments_count: 2100,
    genres: [
      { name: "Drama" },
      { name: "Crime" }
    ],
    actors: [
      { name: "Tim Robbins" },
      { name: "Morgan Freeman" }
    ],
    directors: [
      { name: "Frank Darabont" }
    ]
  },
  {
    movie_id: "m002",
    title: "The Matrix",
    year: 1999,
    runtime: 136,
    rating: 8.7,
    comments_count: 1540,
    genres: [
      { name: "Action" },
      { name: "Sci-Fi" },
      { name: "Drama" }
    ],
    actors: [
      { name: "Keanu Reeves" },
      { name: "Laurence Fishburne" }
    ],
    directors: [
      { name: "Lana Wachowski" },
      { name: "Lilly Wachowski" }
    ]
  },
  {
    movie_id: "m003",
    title: "Forrest Gump",
    year: 1994,
    runtime: 142,
    rating: 8.8,
    comments_count: 1700,
    genres: [
      { name: "Drama" },
      { name: "Romance" }
    ],
    actors: [
      { name: "Tom Hanks" },
      { name: "Robin Wright" }
    ],
    directors: [
      { name: "Robert Zemeckis" }
    ]
  },
  {
    movie_id: "m004",
    title: "Toy Story",
    year: 1995,
    runtime: 81,
    rating: 8.3,
    comments_count: 980,
    genres: [
      { name: "Animation" },
      { name: "Comedy" },
      { name: "Family" }
    ],
    actors: [
      { name: "Tom Hanks" },
      { name: "Tim Allen" }
    ],
    directors: [
      { name: "John Lasseter" }
    ]
  },
  {
    movie_id: "m005",
    title: "Fight Club",
    year: 1999,
    runtime: 139,
    rating: 8.8,
    comments_count: 1900,
    genres: [
      { name: "Drama" },
      { name: "Thriller" }
    ],
    actors: [
      { name: "Brad Pitt" },
      { name: "Edward Norton" }
    ],
    directors: [
      { name: "David Fincher" }
    ]
  },
  {
    movie_id: "m006",
    title: "Speed",
    year: 1994,
    runtime: 116,
    rating: 7.2,
    comments_count: 860,
    genres: [
      { name: "Action" },
      { name: "Thriller" }
    ],
    actors: [
      { name: "Keanu Reeves" },
      { name: "Sandra Bullock" }
    ],
    directors: [
      { name: "Jan de Bont" }
    ]
  },
  {
    movie_id: "m007",
    title: "Titanic",
    year: 1997,
    runtime: 194,
    rating: 7.9,
    comments_count: 2500,
    genres: [
      { name: "Drama" },
      { name: "Romance" }
    ],
    actors: [
      { name: "Leonardo DiCaprio" },
      { name: "Kate Winslet" }
    ],
    directors: [
      { name: "James Cameron" }
    ]
  },
  {
    movie_id: "m008",
    title: "John Wick",
    year: 2014,
    runtime: 101,
    rating: 7.4,
    comments_count: 1300,
    genres: [
      { name: "Action" },
      { name: "Thriller" }
    ],
    actors: [
      { name: "Keanu Reeves" },
      { name: "Michael Nyqvist" }
    ],
    directors: [
      { name: "Chad Stahelski" }
    ]
  },
  {
    movie_id: "m009",
    title: "The Green Mile",
    year: 1999,
    runtime: 189,
    rating: 8.6,
    comments_count: 1750,
    genres: [
      { name: "Drama" },
      { name: "Fantasy" }
    ],
    actors: [
      { name: "Tom Hanks" },
      { name: "Michael Clarke Duncan" }
    ],
    directors: [
      { name: "Frank Darabont" }
    ]
  },
  {
    movie_id: "m010",
    title: "Mad Max Fury Road",
    year: 2015,
    runtime: 120,
    rating: 8.1,
    comments_count: 1450,
    genres: [
      { name: "Action" },
      { name: "Adventure" },
      { name: "Sci-Fi" }
    ],
    actors: [
      { name: "Tom Hardy" },
      { name: "Charlize Theron" }
    ],
    directors: [
      { name: "George Miller" }
    ]
  }
])

db.movies_meta.countDocuments()

db.movies_meta.find(
  { "genres.name": "Drama" },
  { _id: 0, movie_id: 1, title: 1, year: 1, genres: 1 }
).pretty()

db.movies_meta.find(
  { title: "The Matrix" },
  { _id: 0, title: 1, comments_count: 1 }
).pretty()

db.movies_meta.updateOne(
  { title: "The Matrix" },
  { $set: { comments_count: 1600 } }
)

db.movies_meta.find(
  { title: "The Matrix" },
  { _id: 0, title: 1, comments_count: 1 }
).pretty()