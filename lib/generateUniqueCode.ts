export function generateUniqueCode( username:any) {

  function generateRandomNumber() {
      return Math.floor(10000 + Math.random() * 90000);
  }
  const title= "mv"
  const formattedTitle = title.trim().toUpperCase();
  const formattedUsername = username.trim().toUpperCase().split(" ");

  let randomNumbers = Math.floor(Math.random()*100000)

  const uniqueCode = formattedTitle +"-"+ formattedUsername[0].split("")[0]+ formattedUsername[1].split("")[0] + "-"+randomNumbers;
  
  return uniqueCode;
}
