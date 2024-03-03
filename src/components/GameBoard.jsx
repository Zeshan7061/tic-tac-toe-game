import { useCallback, useEffect, useState } from 'react';

function GameBoard() {
	const [gridSize] = useState(9);
	const [cells, setCells] = useState([]);

	const drawGrid = useCallback(() => {
		const cellCordinates = [];
		for (let cell = 0; cell < gridSize; cell++) {
			cellCordinates[cell] = '';
		}

		setCells(cellCordinates);
	}, [gridSize]);

	useEffect(() => {
		drawGrid();
	}, [drawGrid]);

	return (
		<div className='h-screen w-screen grid place-content-center p-5 bg-slate-300'>
			<h1 className='text-4xl font-bold text-center text-white'>Tic Tac Toe</h1>
			<hr />

			<div className='mt-8 grid grid-cols-3 gap-3'>
				{cells.map((cell, i) => (
					<div
						key={i}
						className='w-[90px] h-[90px] bg-white rounded-md shadow-lg font-bold text-4xl grid place-content-center cursor-pointer transition-all hover:bg-zinc-700 hover:text-white active:scale-90'>
						{cell}
					</div>
				))}
			</div>

			<button className='mt-8 text-2xl bg-white p-3 rounded-md shadow-md font-semibold transition-all hover:bg-zinc-700 hover:text-white active:scale-75'>
				Play
			</button>
		</div>
	);
}

export default GameBoard;
