const Cell = ({ sign = '', handleCellClick = function () {}, winner = false }) => {
	return (
		<div
			className={`w-[90px] h-[90px] rounded-md shadow-lg font-bold text-4xl grid place-content-center cursor-pointer transition-all hover:bg-zinc-700 hover:text-white active:scale-90 ${
				winner && sign ? 'bg-green-900 text-white' : 'bg-white text-black'
			}`}
			onClick={handleCellClick}>
			{sign}
		</div>
	);
};

export default Cell;
