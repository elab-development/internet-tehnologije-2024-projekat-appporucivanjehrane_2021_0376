interface Props {
  icon: string;
  title: string;
  text: string;
}

const ServiceCard = ({ icon, title, text }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-white py-4">
      <div className="size-32 rounded-full bg-red-600">
        <img src={icon} className="size-32 p-6 invert" />
      </div>
      <h2 className="text-3xl font-semibold">{title}</h2>
      <p className="px-8 font-medium text-gray-600">{text}</p>
    </div>
  );
};

export default ServiceCard;