import React, { useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from '../../Hooks/Axios/useAxios';
import { toast } from 'react-toastify';

const AddProperty = () => {
    const queryClient = useQueryClient();
    const { user, theme } = useContext(AuthContext);
    const axiosInstance = useAxios()

    const addPropertymutation = useMutation({
        mutationFn: (newProperty) =>
            axiosInstance.post('/property', newProperty).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries(['myproperty', user.email]);
        }
    })

    // Theme-based classes
    const pageBg = theme === 'dark' ? 'bg-[#121212]' : 'bg-[#F8F8F8]';
    const cardBg = theme === 'dark' ? 'bg-[#1E1E1E] text-gray-200' : 'bg-white text-gray-800';
    const inputBg = theme === 'dark' ? 'bg-[#2C2C2C] text-gray-200 placeholder-gray-400' : 'bg-white text-gray-800 placeholder-gray-500';
    const borderColor = theme === 'dark' ? 'border-gray-600' : 'border-gray-300';
    const labelColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';

    // Form submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const newProperty = {
            propertyName: form.propertyName.value,
            category: form.category.value,
            type: form.type.value,
            price: Number(form.price.value),       
            beds: Number(form.beds.value),         
            baths: Number(form.baths.value),       
            sqft: Number(form.sqft.value),         
            image: form.image.value,
            sellerName: user.displayName,
            sellerEmail: user.email,
            sellerContact: form.sellerContact.value,
            sellerImage: user.photoURL,
            buildYear: Number(form.buildYear.value), 
            location: form.location.value,
            description: form.description.value,
            // postedOn: new Date().toISOString().split('T')[0] // current date
            postedOn: new Date().toISOString()
        };

        addPropertymutation.mutate(newProperty, {
            onSuccess: (data) => {
                if (data.insertedId) {
                    toast.success("Property Added Successfully!", { theme: 'colored' });
                    e.target.reset();
                }
            }
        });
    };


    return (
        <div className={`${pageBg} min-h-screen py-10`}>
            <div className="max-w-6xl mx-auto px-4">
                {/* Top Title Section */}
                <div className="text-center mb-8">
                    <p className="text-[#1563DF] font-bold tracking-wider">Add New Property</p>
                    <p className="text-4xl font-semibold my-2">
                        Fill the details to list your property
                    </p>
                </div>

                {/* Form Card */}
                <div className={`${cardBg} shadow-lg rounded-3xl p-10`}>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Property Name + Category */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={`block mb-2 text-sm font-medium ${labelColor}`}>Property Name</label>
                                <input
                                    name="propertyName"
                                    type="text"
                                    placeholder="Aurelia Highrise Apartment"
                                    className={`w-full px-5 py-3 rounded-xl ${inputBg} ${borderColor} border focus:outline-none focus:ring-2 focus:ring-[#1563DF]`}
                                    required
                                />
                            </div>
                            <div>
                                <label className={`block mb-2 text-sm font-medium ${labelColor}`}>Category</label>
                                <select
                                    name="category"
                                    className={`w-full px-5 py-3 rounded-xl ${inputBg} ${borderColor} border focus:outline-none focus:ring-2 focus:ring-[#1563DF]`}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option>Home</option>
                                    <option>Studio</option>
                                    <option>Office</option>
                                </select>
                            </div>
                        </div>

                        {/* Type + Price */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={`block mb-2 text-sm font-medium ${labelColor}`}>Type</label>
                                <select
                                    name="type"
                                    className={`w-full px-5 py-3 rounded-xl ${inputBg} ${borderColor} border focus:outline-none focus:ring-2 focus:ring-[#1563DF]`}
                                    required
                                >
                                    <option value="">Select Type</option>
                                    <option>Rent</option>
                                    <option>Sell</option>
                                </select>
                            </div>
                            <div>
                                <label className={`block mb-2 text-sm font-medium ${labelColor}`}>Price ($)</label>
                                <input
                                    name="price"
                                    type="text"
                                    placeholder="2600"
                                    className={`w-full px-5 py-3 rounded-xl ${inputBg} ${borderColor} border focus:outline-none focus:ring-2 focus:ring-[#1563DF]`}
                                    required
                                />
                            </div>
                        </div>

                        {/* Beds + Baths + Sqft */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {['Beds', 'Baths', 'Sqft'].map((field, idx) => (
                                <div key={idx}>
                                    <label className={`block mb-2 text-sm font-medium ${labelColor}`}>{field}</label>
                                    <input
                                        name={field.toLowerCase()}
                                        type="text"
                                        placeholder={field === 'Sqft' ? '980' : '2'}
                                        className={`w-full px-5 py-3 rounded-xl ${inputBg} ${borderColor} border focus:outline-none focus:ring-2 focus:ring-[#1563DF]`}
                                        required
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className={`block mb-2 text-sm font-medium ${labelColor}`}>Property Image URL</label>
                            <input
                                name="image"
                                type="url"
                                placeholder="https://..."
                                className={`w-full px-5 py-3 rounded-xl ${inputBg} ${borderColor} border focus:outline-none focus:ring-2 focus:ring-[#1563DF]`}
                                required
                            />
                        </div>

                        {/* Seller Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className={`block mb-2 text-sm font-medium ${labelColor}`}>Seller Name</label>
                                <input
                                    name="sellerName"
                                    type="text"
                                    value={user.displayName}
                                    readOnly
                                    className={`w-full px-5 py-3 rounded-xl ${inputBg} ${borderColor} border focus:outline-none focus:ring-2 focus:ring-[#1563DF]`}
                                />
                            </div>
                            <div>
                                <label className={`block mb-2 text-sm font-medium ${labelColor}`}>Seller Email</label>
                                <input
                                    name="sellerEmail"
                                    type="email"
                                    value={user.email}
                                    readOnly
                                    className={`w-full px-5 py-3 rounded-xl ${inputBg} ${borderColor} border focus:outline-none focus:ring-2 focus:ring-[#1563DF]`}
                                />
                            </div>
                            <div>
                                <label className={`block mb-2 text-sm font-medium ${labelColor}`}>Seller Contact</label>
                                <input
                                    name="sellerContact"
                                    type="text"
                                    placeholder="+1-555-1234"
                                    className={`w-full px-5 py-3 rounded-xl ${inputBg} ${borderColor} border focus:outline-none focus:ring-2 focus:ring-[#1563DF]`}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className={`block mb-2 text-sm font-medium ${labelColor}`}>Seller Image URL</label>
                            <input
                                name="sellerImage"
                                type="url"
                                value={user.photoURL}
                                readOnly
                                className={`w-full px-5 py-3 rounded-xl ${inputBg} ${borderColor} border focus:outline-none focus:ring-2 focus:ring-[#1563DF]`}
                            />
                        </div>

                        {/* Build Year */}
                        <div>
                            <label className={`block mb-2 text-sm font-medium ${labelColor}`}>Build Year</label>
                            <input
                                name="buildYear"
                                type="text"
                                placeholder="2022"
                                className={`w-full px-5 py-3 rounded-xl ${inputBg} ${borderColor} border focus:outline-none focus:ring-2 focus:ring-[#1563DF]`}
                                required
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className={`block mb-2 text-sm font-medium ${labelColor}`}>Location</label>
                            <input
                                name="location"
                                type="text"
                                placeholder="City, Street, Country"
                                className={`w-full px-5 py-3 rounded-xl ${inputBg} ${borderColor} border focus:outline-none focus:ring-2 focus:ring-[#1563DF]`}
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className={`block mb-2 text-sm font-medium ${labelColor}`}>Property Description</label>
                            <textarea
                                name="description"
                                placeholder="A brief description about the property..."
                                rows="4"
                                className={`w-full px-5 py-3 rounded-xl ${inputBg} ${borderColor} border focus:outline-none focus:ring-2 focus:ring-[#1563DF]`}
                                required
                            ></textarea>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full py-3 cursor-pointer rounded-xl bg-[#1563DF] text-white font-semibold hover:bg-[#0f4bb5] transition-colors"
                        >
                            Create Property
                        </button>

                        {/* Back Button */}
                        <div className="mt-4 text-center">
                            <Link
                                to="/allproduct"
                                className="text-[#1563DF] hover:underline font-medium"
                            >
                                ← Back To Properties
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProperty;
