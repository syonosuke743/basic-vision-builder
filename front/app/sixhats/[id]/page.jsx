
const apiUrl = process.env.NEXT_PUBLIC_API_URL

export default async function sixhat({params}){

  const res = await fetch(`${apiUrl}/api/v1/sixhats/${params.id}`);
  const sixhats = await res.json();

  //console.log(sixhats)

  return(
    <div>
      <div>{sixhats.theme}</div>
    </div>
  )
}