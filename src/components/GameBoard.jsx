import { useCallback, useEffect, useState } from 'react';
import Cell from './Cell';

function GameBoard() {
	const [gridSize] = useState(9);
	const [cells, setCells] = useState([]);
	const [playerType, setPlayerType] = useState('');
	const [winner, setWinner] = useState('');
	const [draw, setDraw] = useState(false);

	const winningCombos = '012,345,678,036,147,258,048,246';

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

	const handleCellClick = cellPos => {
		if (!playerType || cells[cellPos]) return;

		const sign = playerType === 'P1' ? 'X' : 'O';
		const updatedCells = cells.map((cell, i) => (cellPos === i ? sign : cell));
		setCells(updatedCells);

		if (checkWinner(sign, updatedCells)) return;

		setPlayerType(playerType === 'P1' ? 'P2' : 'P1');
	};

	const playGame = () => {
		drawGrid();
		setPlayerType('P1');
		setWinner('');
		setDraw(false);
	};

	const checkWinner = (cellValue, updatedCells) => {
		const combos = winningCombos.split(',');
		let isWinner = false;

		for (const combo of combos) {
			const comboArr = combo.split('');
			isWinner = comboArr.every(el => updatedCells[el] === cellValue);

			if (isWinner) {
				const winnerCells = updatedCells?.map((cell, i) =>
					comboArr.includes(String(i)) ? cell : ''
				);
				setCells(winnerCells);

				setWinner(playerType === 'P1' ? 'Player X' : 'Player O');
				setPlayerType('');
				break;
			}
		}

		if (!isWinner && updatedCells?.every(val => val)) {
			setDraw(true);
			setPlayerType('');
			isWinner = true;
		}

		return isWinner;
	};

	return (
		<div className='h-screen w-screen grid place-content-center p-5 bg-slate-400'>
			<h1 className='text-5xl font-extrabold text-center text-white'>Tic Tac Toe</h1>
			<hr />

			{draw && (
				<h1 className='font-extrabold text-center text-4xl text-green-900 animate-bounce mt-8'>
					Game draw!
				</h1>
			)}

			{winner && (
				<h1 className='font-extrabold text-center text-4xl text-green-900 animate-bounce mt-8'>
					{winner} Won!
				</h1>
			)}

			{playerType && (
				<div className='flex gap-3 mt-10'>
					<p
						className={`text-xl font-semibold text-white rounded-lg p-2 transition-all ${
							playerType === 'P1' && 'bg-zinc-700'
						}`}>
						Player X: {playerType === 'P1' && <span className='font-bold'>Move</span>}
					</p>
					<p
						className={`text-xl font-semibold text-white rounded-lg p-2 transition-all ${
							playerType === 'P2' && 'bg-zinc-700'
						}`}>
						Player O: {playerType === 'P2' && <span className='font-bold'>Move</span>}
					</p>
				</div>
			)}

			<div className='mt-8 grid grid-cols-3 gap-3'>
				{cells.map((cell, i) => (
					<Cell
						key={i}
						sign={cell}
						winner={winner}
						handleCellClick={() => handleCellClick(i)}
					/>
				))}
			</div>

			<button
				className='mt-8 text-2xl bg-white p-3 rounded-md shadow-md font-semibold transition-all hover:bg-zinc-700 hover:text-white active:scale-75'
				onClick={playGame}>
				Play {(winner || draw) && ' again'}
			</button>
		</div>
	);
}

export default GameBoard;
