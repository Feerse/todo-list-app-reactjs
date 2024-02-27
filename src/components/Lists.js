function Lists({ items, onDeleteItem, onUpdateItem }) {
	return (
		<div>
			<ul>
				{/* Melakukan iterasi melalui setiap item dalam array `items` */}
				{items.map((item) => (
					<Item
						item={item}
						key={item.id}
						onDeleteItem={onDeleteItem}
						onUpdateItem={onUpdateItem}
					/>
				))}
			</ul>
		</div>
	);
}

function Item({ item, onDeleteItem, onUpdateItem }) {
	return (
		<li className="flex gap-2 items-center w-full justify-center">
			<input
				type="checkbox"
				value={item.packed}
				defaultChecked={item.packed}
				onChange={() => onUpdateItem(item.id)}
			/>
			{/* ternary operator to check simple condition */}
			{/* if item.packed === true then apply this style textDecoration: "line-through" 
      else don't do anything */}
			<span style={item.packed ? { textDecoration: 'line-through' } : {}}>
				{item.description} - {item.date}
			</span>
			<button onClick={() => onDeleteItem(item.id)}>❌</button>
		</li>
	);
}

export default Lists;
