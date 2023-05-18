import React, { useEffect, useState } from "react";
import "../css/item.css";
import Stars from "./Stars";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { addToCart, CartState } from "../store/features/cartSlice";

export default function Item() {
	const dispatch = useDispatch();
	const cart: CartState = useSelector(
		(state: { cart: CartState }) => state.cart
	);
	let [image, setImage] = useState("/items/item10.jpg");
	let [data, setData] = useState({
		added_by: 0,
		product_name: "",
		inventory: 0,
		price: 0,
		rating: 0,
		description: "",
	});
	const params = useParams();
	useEffect(() => {
		(async () => {
			const prodData = await axios.get(
				`https://localhost:4000/product/${params.id}`
			);
			setData(prodData.data.data.product);
			setImage(prodData.data.data.images[0].file_path)

		})();
	}, [params.id]);

	const handleAddToCart = () => {
		dispatch(addToCart(data));
	};
	function changeImage(e) {
		setImage(e.target.src);
	}

	return (
		<div className="item-preview">
			<div className="item-info">
				{/* TODO: all images need to be changed with the database */}
				<div className="images">
					<div className="main-image-container">
						<img src={image} className="border-radius main-image" />
					</div>
					<div className="other-images">
						<img
							src="/items/item10.jpg"
							className="border-radius other"
							onClick={changeImage}
							tabIndex={0}
						/>
						<img
							src="/items/item11.jpg"
							className="border-radius other"
							onClick={changeImage}
							tabIndex={0}
						/>
						<img
							src="/items/item15.avif"
							className="border-radius other"
							onClick={changeImage}
							tabIndex={0}
						/>
						<img
							src="/items/item1.png"
							className="border-radius other"
							onClick={changeImage}
							tabIndex={0}
						/>
						<img
							src="/items/item2.png"
							className="border-radius other"
							onClick={changeImage}
							tabIndex={0}
						/>
						<img
							src="/items/item3.png"
							className="border-radius other"
							onClick={changeImage}
							tabIndex={0}
						/>
					</div>
				</div>
				<div className="item-text">
					<h1>{data?.product_name}</h1>
					<div className="rate">
						<Stars rate={data?.rating} />
						<p>&#8226;</p>
						{/* TODO: Reviews needs to be changed by the database */}
						<p>{30} Reviews</p>
					</div>

					<div className="desc-title">Description</div>
					<p className="desc-text">{data?.description}</p>
					<div className="buying">
						<button
							className="purchase-button"
							onClick={() => handleAddToCart()}
						>
							<NavLink to="/cart" className="add-to-cart">
								<img src="/shopping-bag-white.png" />
								Add To Cart
							</NavLink>
						</button>
						<div className="price">{data?.price}$</div>
					</div>
				</div>
			</div>
			<div className="reviews-area">
				<div>
					<div className="reviews-selection">
						<NavLink to="" className="add-review">
							Reviews
						</NavLink>
						<NavLink to="add-review" className="add-review">
							Add Review
						</NavLink>
					</div>
					<Outlet />
				</div>
			</div>
		</div>
	);
}
