import { useCallback, useEffect, useState } from 'react';
import Cell from './Cell';

function GameBoard() {
	const [gridSize] = useState(9);
	const [cells, setCells] = useState([]);
	const [playerType, setPlayerType] = useState('');

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

	const playGame = () => {
		drawGrid();
		setPlayerType('P1');
	};

	const handleCellClick = cellPos => {
		if (!playerType || cells[cellPos]) return;

		const sign = playerType === 'P1' ? 'X' : 'O';
		const updatedCells = cells.map((cell, i) => (cellPos === i ? sign : cell));
		setCells(updatedCells);
		setPlayerType(playerType === 'P1' ? 'P2' : 'P1');
	};

	return (
		<div className='h-screen w-screen grid place-content-center p-5 bg-slate-300'>
			<h1 className='text-4xl font-bold text-center text-white'>Tic Tac Toe</h1>
			<hr />

			{playerType && (
				<div className='flex gap-3 my-5'>
					<p
						className={`text-xl font-semibold text-white rounded-lg p-2 transition-all ${
							playerType === 'P1' && 'bg-zinc-700'
						}`}>
						Player X:{' '}
						{playerType === 'P1' && <span className='font-bold'>Your turn</span>}
					</p>
					<p
						className={`text-xl font-semibold text-white rounded-lg p-2 transition-all ${
							playerType === 'P2' && 'bg-zinc-700'
						}`}>
						Player O:{' '}
						{playerType === 'P2' && <span className='font-bold'>Your turn</span>}
					</p>
				</div>
			)}

			<div className='mt-8 grid grid-cols-3 gap-3'>
				{cells.map((cell, i) => (
					<Cell key={i} sign={cell} handleCellClick={() => handleCellClick(i)} />
				))}
			</div>

			<button
				className='mt-8 text-2xl bg-white p-3 rounded-md shadow-md font-semibold transition-all hover:bg-zinc-700 hover:text-white active:scale-75'
				onClick={playGame}>
				Play
			</button>
		</div>
	);
}

export default GameBoard;
