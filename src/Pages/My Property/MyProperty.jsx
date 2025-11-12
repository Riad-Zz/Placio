import React, { useContext, useRef, useState } from 'react';
import useAxios from '../../Hooks/Axios/useAxios';
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loader from '../../Components/Loader/Loader';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import { IoLocationOutline as IconLocation } from 'react-icons/io5';
import { FiEdit as IconEdit, FiTrash2 as IconTrash } from 'react-icons/fi';
import { BsArrowRight as IconArrowForward } from 'react-icons/bs';
import { LuBedDouble } from 'react-icons/lu';
import { LiaBathSolid } from 'react-icons/lia';
import { TfiRulerAlt2 } from 'react-icons/tfi';
import NoProperty from './NoProperty';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/AxiosSecure/useAxiosSecure';

const MyProperty = () => {
    const queryClient = useQueryClient();
    const { user, theme } = useContext(AuthContext);
    const axiosInstance = useAxiosSecure();
    const modalRef = useRef(null);
    const [editProperty, setEditProperty] = useState(null);

    const { data: myproperty = [], isLoading } = useQuery({
        queryKey: ['myproperty', user.email],
        queryFn: () => axiosInstance(`/property?sellerEmail=${user.email}`).then((res) => res.data),
    });

    const updateProperty = useMutation({
        mutationFn: ({ id, updata }) => axiosInstance.patch(`/property/${id}`, updata).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries(['myproperty', user.email]);
        }
    })

    const deleteProperty = useMutation({
        mutationFn: (id) => axiosInstance.delete(`/property/${id}`).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries(['myproperty', user.email]);
        }
    });

    if (isLoading) return <Loader />;

    const handleModalOpen = (property) => {
        setEditProperty(property);
        modalRef.current.showModal();
    };

    //------------------Handle Edit --------------------------------
    const handleEdit = (e) => {
        e.preventDefault();
        const modal = e.target;

        const updatedData = {
            propertyName: modal.propertyName.value,
            image: modal.image.value,
            location: modal.location.value,
            beds: Number(modal.beds.value),
            baths: Number(modal.baths.value),
            sqft: Number(modal.sqft.value),
            price: Number(modal.price.value),
            buildYear: Number(modal.buildYear.value),
            type: modal.type.value,
            description: modal.description.value,
            postedOn: new Date().toISOString(),
        };

        if(modalRef.current){
            modalRef.current.close() ;
        }

        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`,
            background: theme === 'dark' ? '#1E1E1E' : '#fff',
            color: theme === 'dark' ? '#fff' : '#333',
            confirmButtonColor: '#1563DF',
            denyButtonColor: '#888',
            cancelButtonColor: '#d33'
        }).then((result) => {
            if (result.isConfirmed) {
                updateProperty.mutate(
                    { id: editProperty._id, updata: updatedData },
                    {
                        onSuccess: (data) => {
                            if (data.modifiedCount) {
                                Swal.fire({
                                    title: "Your Property is Updated!",
                                    icon: "success",
                                    background: theme === 'dark' ? '#1E1E1E' : '#fff',
                                    color: theme === 'dark' ? '#fff' : '#333',
                                    confirmButtonColor: '#1563DF',
                                });
                            } else {
                                Swal.fire({
                                    title: "No changes were made.",
                                    icon: "info",
                                    background: theme === 'dark' ? '#1E1E1E' : '#fff',
                                    color: theme === 'dark' ? '#fff' : '#333',
                                    confirmButtonColor: '#1563DF',
                                });
                            }
                        },
                        onError: () => {
                            Swal.fire("Failed to update property.", "", "error");
                        }
                    }
                );
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };


//-----------------------------Handle Delete--------------------------------------
const handleDelete = (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        background: theme === 'dark' ? '#1E1E1E' : '#fff',
        color: theme === 'dark' ? '#fff' : '#333',
    }).then((result) => {
        if (result.isConfirmed) {
            deleteProperty.mutate(id, {
                onSuccess: (data) => {
                    if (data.deletedCount) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                            background: theme === 'dark' ? '#1E1E1E' : '#fff',
                            color: theme === 'dark' ? '#fff' : '#333',
                            confirmButtonColor: '#1563DF',
                        });
                    }
                },
                onError: () => {
                    Swal.fire({
                        title: "Failed to delete!",
                        icon: "error",
                        background: theme === 'dark' ? '#1E1E1E' : '#fff',
                        color: theme === 'dark' ? '#fff' : '#333',
                        confirmButtonColor: '#1563DF',
                    });
                }
            });
        }
    });
};


    return (
        <div className={`min-h-screen py-10 ${theme === 'dark' ? 'bg-[#1E1E1E]' : 'bg-gray-100'}`}>
            <div className="md:max-w-10/12 mx-auto px-4">
                <p className="text-center text-3xl text-[#1563DF] font-bold tracking-wider">My Properties</p>
                <div className={`text-center mt-2 tracking-wide font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                    Manage and explore all your properties in one place — effortlessly track, update, and showcase your listings.
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10">
                    {myproperty.map((p) => (
                        <div
                            key={p._id}
                            className={`flex flex-col md:flex-row rounded-xl overflow-hidden shadow-sm transition-all duration-300 bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700`}
                        >
                            <div className="w-full md:w-2/5 relative h-50 md:h-auto">
                                <img src={p.image} alt={p.propertyName} className="w-full h-full object-cover" />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className="bg-gray-800 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                        {p.type === 'Sell' ? 'For Sale' : 'For Rent'}
                                    </span>
                                </div>
                            </div>

                            <div className="w-full md:w-3/5 p-6 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{p.propertyName}</h3>
                                    <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 mb-4">
                                        <IconLocation size={18} />
                                        <span className="text-sm">{p.location}</span>
                                    </div>

                                    <div className="flex flex-wrap gap-6 text-gray-700 dark:text-gray-300 text-[15px] font-medium mb-5">
                                        <div className="flex items-center gap-1"><LuBedDouble size={18} /> Beds : {p.beds}</div>
                                        <div className="flex items-center gap-1"><LiaBathSolid size={18} /> Baths : {p.baths}</div>
                                        <div className="flex items-center gap-1"><TfiRulerAlt2 size={18} /> Size : {p.sqft} sqft</div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-5">
                                        <Link
                                            to={`/details/${p._id}`}
                                            className="flex-1 md:flex-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-200 text-sm"
                                        >
                                            <IconArrowForward /> Details
                                        </Link>

                                        <button
                                            onClick={() => handleModalOpen(p)}
                                            className="flex-1 cursor-pointer md:flex-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition duration-200 text-sm"
                                        >
                                            <IconEdit /> Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(p._id)}
                                            className="flex-1 md:flex-auto cursor-pointer flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-100 text-red-700 font-medium hover:bg-red-200 dark:bg-red-900/40 dark:text-red-400 dark:hover:bg-red-900/60 transition duration-200 text-sm"
                                        >
                                            <IconTrash /> Delete
                                        </button>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={user?.photoURL || 'https://placehold.co/40x40/EFEFEF/333?text=A'}
                                            alt={user?.displayName}
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {user?.displayName}
                                        </span>
                                    </div>

                                    <span className="text-lg font-bold text-gray-900 dark:text-white">${p.price}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {myproperty.length === 0 && <NoProperty />}

                {/* --------------------- Modal ---------------------- */}
                <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                    <div className={`modal-box rounded-xl ${theme === "dark" ? "bg-[#1E1E1E] text-gray-100" : "bg-white text-gray-800"}`}>
                        <h3 className="text-2xl font-semibold text-center mb-6">Edit Property Details</h3>

                        <form onSubmit={handleEdit} className="space-y-5">
                            <div>
                                <label className="block mb-2 text-sm font-medium">Property Name</label>
                                <input
                                    type="text"
                                    name="propertyName"
                                    defaultValue={editProperty?.propertyName || ""}
                                    className={`input input-bordered w-full outline-none focus:ring-2 focus:ring-[#1563DF] ${theme === "dark" ? "bg-[#2A2A2A] border-gray-700" : "bg-gray-50 border-gray-300"}`}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium">Image URL</label>
                                <input
                                    type="text"
                                    name="image"
                                    defaultValue={editProperty?.image || ""}
                                    className={`input input-bordered w-full outline-none focus:ring-2 focus:ring-[#1563DF] ${theme === "dark" ? "bg-[#2A2A2A] border-gray-700" : "bg-gray-50 border-gray-300"}`}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    defaultValue={editProperty?.location || ""}
                                    className={`input input-bordered w-full outline-none focus:ring-2 focus:ring-[#1563DF] ${theme === "dark" ? "bg-[#2A2A2A] border-gray-700" : "bg-gray-50 border-gray-300"}`}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <div>
                                    <label className="block mb-2 text-sm font-medium">Beds</label>
                                    <input
                                        type="text"
                                        name="beds"
                                        defaultValue={editProperty?.beds || ""}
                                        className={`input input-bordered w-full outline-none focus:ring-2 focus:ring-[#1563DF] ${theme === "dark" ? "bg-[#2A2A2A] border-gray-700" : "bg-gray-50 border-gray-300"}`}
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium">Baths</label>
                                    <input
                                        type="text"
                                        name="baths"
                                        defaultValue={editProperty?.baths || ""}
                                        className={`input input-bordered w-full outline-none focus:ring-2 focus:ring-[#1563DF] ${theme === "dark" ? "bg-[#2A2A2A] border-gray-700" : "bg-gray-50 border-gray-300"}`}
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium">Sqft</label>
                                    <input
                                        type="text"
                                        name="sqft"
                                        defaultValue={editProperty?.sqft || ""}
                                        className={`input input-bordered w-full outline-none focus:ring-2 focus:ring-[#1563DF] ${theme === "dark" ? "bg-[#2A2A2A] border-gray-700" : "bg-gray-50 border-gray-300"}`}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium">Price ($)</label>
                                <input
                                    type="text"
                                    name="price"
                                    defaultValue={editProperty?.price || ""}
                                    className={`input input-bordered w-full outline-none focus:ring-2 focus:ring-[#1563DF] ${theme === "dark" ? "bg-[#2A2A2A] border-gray-700" : "bg-gray-50 border-gray-300"}`}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium">Type</label>
                                <select
                                    name="type"
                                    defaultValue={editProperty?.type || "Sell"}
                                    className={`select select-bordered w-full outline-none focus:ring-2 focus:ring-[#1563DF] ${theme === "dark" ? "bg-[#2A2A2A] border-gray-700" : "bg-gray-50 border-gray-300"}`}
                                >
                                    <option value="Sell">Sell</option>
                                    <option value="Rent">Rent</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium">Build Year</label>
                                <input
                                    type="text"
                                    name="buildYear"
                                    defaultValue={editProperty?.buildYear || ""}
                                    className={`input input-bordered w-full outline-none focus:ring-2 focus:ring-[#1563DF] ${theme === "dark" ? "bg-[#2A2A2A] border-gray-700" : "bg-gray-50 border-gray-300"}`}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium">Description</label>
                                <textarea
                                    name="description"
                                    rows="3"
                                    defaultValue={editProperty?.description || ""}
                                    className={`textarea textarea-bordered w-full outline-none focus:ring-2 focus:ring-[#1563DF] ${theme === "dark" ? "bg-[#2A2A2A] border-gray-700" : "bg-gray-50 border-gray-300"}`}
                                ></textarea>
                            </div>

                            <div className="flex justify-end gap-3 pt-5">
                                <button
                                    type="button"
                                    onClick={() => modalRef.current.close()}
                                    className="btn btn-outline border-[#1563DF] text-[#1563DF] hover:bg-[#1563DF] hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn bg-[#1563DF] text-white border-none hover:bg-[#0F52BD]"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default MyProperty;
