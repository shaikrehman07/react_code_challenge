function Details({ name, sector }) {
  return (
    <div className="flex flex-col items-stretch space-y-4 ml-2 w-[245px]">
      <div className="self-start sm:self-center text-lg font-semibold">
        Details
      </div>
      <div className="self-start flex flex-col items-stretch space-y-6">
        <div className="self-start">
          <div className="flex flex-wrap">
            <div className="mr-2 text-medium font-medium">Name:</div>
            <div className="mr-2 text-medium font-small">{name}</div>
          </div>
          <div className="flex">
            <div className="mr-2 text-medium font-medium">Sector:</div>
            <div className="mr-2 text-medium font-small">
              {sector !== "select" ? sector : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
