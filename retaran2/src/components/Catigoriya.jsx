import { NavLink } from "react-router-dom";

function Catigoriya({ data, rest_id, tabl_id }) {
  return (
    <div className="flex max-[399px]:gap-2 gap-4 mb-2 ">
      {data.product_categore.map((categore) => {
        let { id } = categore;
        return (
          <NavLink
            className=" px-2 max-[400px]:hidden py-1 max-[400px]:overflow-y-auto bg-white  rounded-lg"
            to={`/menu/${rest_id}/${tabl_id}/${id}`}
            key={categore.id}
          >
            <h1 className="max-md:text-sm max-[360px]:text-[8px]  max-[399px]:text-[10px] max-sm:text-[10px] font-bold ">
              {categore.name}
            </h1>
          </NavLink>
        );
      })}
      <div className="carousel carousel-end  space-x-2 max-[400px]:flex hidden   w-full">
        {data.product_categore.map((prev) => {
          return (
            <NavLink
              className=" carousel-item  px-2 py-1 max-[400px]:overflow-y-auto bg-white  rounded-lg"
              to={`/menu/${rest_id}/${tabl_id}/${prev.id}`}
              key={prev.id}
            >
              <h1 className="max-md:text-sm max-[360px]:text-[8px]  max-[399px]:text-[10px] max-sm:text-[10px] font-bold ">
                {prev.name}
              </h1>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default Catigoriya;
