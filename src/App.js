import { useState, useEffect } from 'react';
import './css/App.css';
import Logo from './components/Logo';
import Form from './components/Form';
import Lists from './components/Lists';

function App() {
	document.body.classList.add('bg-[#ECE3CE]', 'text-[#3A4D39]');
	const [items, setItems] = useState([]);
	const [filterDate, setFilterDate] = useState('');
	const [filteredItems, setFilteredItems] = useState([]);

	useEffect(() => {
		// Mengambil data dari local storage saat komponen pertama kali dirender
		const storedItems = JSON.parse(localStorage.getItem('items')) || [];
		setItems(storedItems);
	}, []);

	useEffect(() => {
		// Menyimpan data ke local storage setiap kali items berubah
		localStorage.setItem('items', JSON.stringify(items));
	}, [items]);

	function handleFilterItems(filterDate) {
		setFilterDate(filterDate);

		if (!filterDate) {
			// Jika filterDate kosong, tampilkan semua item
			setFilteredItems(items);
		} else {
			// Jika filterDate diisi, filter item berdasarkan tanggal
			const filtered = items.filter((item) => item.date === filterDate);
			setFilteredItems(filtered);
		}
	}

	function handleAddItems(item) {
		setItems((items) => [...items, item]);
		// Memperbarui filteredItems sesuai dengan filter yang aktif
		if (!filterDate || filterDate === item.date) {
			setFilteredItems((prevFilteredItems) => [
				...prevFilteredItems,
				item,
			]);
		}
	}

	function handleDeleteItem(itemId) {
		const newItems = items.filter((item) => item.id !== itemId);
		setItems(newItems);
		// Memperbarui filteredItems setelah menghapus item
		setFilteredItems((prevFilteredItems) =>
			prevFilteredItems.filter((item) => item.id !== itemId),
		);
	}

	function handleUpdateItem(id) {
		setItems((prevItems) =>
			prevItems.map((item) =>
				item.id === id ? { ...item, packed: !item.packed } : item,
			),
		);

		// Memperbarui filteredItems setelah memperbarui item
		setFilteredItems((prevFilteredItems) =>
			prevFilteredItems.map((item) =>
				item.id === id ? { ...item, packed: !item.packed } : item,
			),
		);
	}

	// const alertFilter = document.getElementById('alertFilter');

	// function filteredItemsCondition() {
	// 	if (filteredItems.length > 0) {
	// 		return filteredItems;
	// 	} else {
	// 		return items;
	// 	}
	// }

	// useEffect(() => {
	// 	handleAlertFilter();
	// });

	// const handleAlertFilter = () => {
	// 	const alertFilter = document.getElementById('alertFilter');
	// 	filteredItems.length > 0
	// 		? alertFilter.classList.add('hidden')
	// 		: alertFilter.classList.remove('hidden');
	// };
	return (
		<>
			<Logo />
			<Form
				onAddItems={handleAddItems}
				onFilterItems={handleFilterItems}
			/>
			{/* <div id="alertFilter" className="hidden">
				Tidak ada item yang sesuai dengan filter.
			</div> */}

			<Lists
				items={filteredItems.length > 0 ? filteredItems : items}
				onDeleteItem={handleDeleteItem}
				onUpdateItem={handleUpdateItem}
			/>
		</>
	);
}

export default App;
