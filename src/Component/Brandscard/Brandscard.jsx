import { useNavigate } from "react-router-dom";

export default function Brandscard({ item }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/brandsdetails/${item._id}`);
  };

  return (
    <div
      data-aos="fade-up"
      onClick={handleClick}
      className="  rounded duration-300 p-4 shadow bg-white dark:bg-slate-700 dark:text-slate-200 cursor-pointer hover:shadow-lg transition hover:border-2 hover:border-secondary"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-[200px] object-contain mb-3"
      />
      <h3 className="text-lg font-bold text-center text-secondary">
        {item.name}
      </h3>
    </div>
  );
}
