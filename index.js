async function getData() {
  const res = await fetch(
    "https://api.rawg.io/api/games?key=07b772d114d1402a991f57cff30d6cac"
  );

  const data = await res.json();

  console.log(data);
}

getData();
