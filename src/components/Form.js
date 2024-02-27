import { useState } from 'react';

function Form({ onAddItems, onFilterItems }) {
	const [description, setDescription] = useState('');
	const [date, setDate] = useState('');

	function handleSubmit(e) {
		// mencegah perilaku default dari formulir (menghindari reload halaman).
		e.preventDefault();

		// jika deskripsi kosong, tidak mengembalikan apa-apa
		if (!description || !date) return;

		const newItem = {
			description: description,
			packed: false,
			id: Date.now(),
			date: date,
		};
		// console.log(newItem);

		// Memanggil fungsi onAddItems dari prop untuk menyimpan barang baru ke dalam array state
		onAddItems(newItem);

		// Mereset state description dan quantity setelah submit
		setDescription('');
		setDate('');
	}

	function handleFilter() {
		// Memanggil fungsi onFilterItems dari prop untuk melakukan filter
		onFilterItems(date);
	}

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="w-full flex justify-center gap-2 p-5">
				<input
					type="text"
					placeholder="Masukkan daftar atau list"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="px-3 rounded"
				/>
				<input
					type="date"
					className="px-3 rounded"
					value={date}
					onChange={(e) => setDate(e.target.value)}
				/>
				<button className="px-5 py-2 bg-[#a1ca9f] hover:bg-[#739072] hover:text-gray-100 rounded transition">
					Tambah
				</button>
			</form>
			<div className="w-full text-center pb-6">
				<button
					onClick={handleFilter}
					className="px-5 py-2 bg-[#9fbaca] hover:bg-[#728390] hover:text-gray-100 rounded transition">
					Filter
				</button>
			</div>
		</>
	);
}

export default Form;
