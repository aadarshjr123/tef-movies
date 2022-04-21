import { useQuery } from "@apollo/react-hooks";
import { getOtts } from "../../query/GetOtts";

export const WatchNow = (movies) =>  {

    const { loading, error, data } = useQuery(getOtts);
    if (error) return <h1>{error}</h1>;
    if (loading) 
    return "loading..."

    let links = [];
    
    // console.log(data.getOtts);
    // return data.getOtts;
    // return data.getOtts;
    // console.log(watchOn);

    movies.map((i) => {
        data.getOtts.map((j) => {
                // console.log(j.watchOn)
            // console.l
            if(i.watchOn=== j.name) {
                 console.log(j);   
                links.push({
                    "name": j.name,
                    "image": j.image,
                    "link": i.watchOnLink,
                })
            }
        })
    })

    console.log(links);
    return links;

    // console.log(links);
    // return (
    //     <div>
    //         {
    //             links.map((i) => {
    //                 <div class="ml-10 mt-10 w-40 h-48 font-medium border-gray-500 text-sm border-1 rounded-lg">
    //   <div class="flex justify-center items-center h-28">
    //     <img class="rounded-lg object-fill  h-20 w-20" src={i.image} alt="Mountain" />
    //   </div>
    //   <div class="flex justify-center items-center ">
    //     <hr class="w-36"></hr>
    //   </div>
    //   <div class="m-2 flex justify-center items-center  border-2 border-black">
    //     <p>Rs 149 per month</p>
    //   </div>
    //   <div class="m-2 flex justify-center items-center  border-2 border-black">
    //     {/* <p></p> */}
    //     <a class="text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hover:font-bold" href={i.link}>Watch now</a>
    //   </div>
    // </div>
    //             })
    //         }
    //     </div>
    // )
  }