export default function MonthBar() {
	return (
	  <div className="flex">
		{Array.from({ length: 12 }).map((_, index) => (
		  <span key={index} className="ml-4 mr-32 text-left">
			{index + 1}
		  </span>
		))}
	  </div>
	);
  }
