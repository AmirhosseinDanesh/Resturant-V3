import React from 'react'
import { Formik, Form } from 'formik'
import { DataUrlV1 } from "../../../Data/Data"
import Input from '../../../Components/Input/Input.jsx'
import { toast } from 'react-toastify';

import Toast from "../../../Components/Toast/Toast.jsx"
export default function Campaign() {
    const LocalStorageData = JSON.parse(localStorage.getItem("user"))

    return (
        <>
            <Formik
                // validate={offsValue}
                initialValues={{ discount: "" }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    fetch(`${DataUrlV1}/offs/all`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${LocalStorageData.token}`,

                        },
                        body: JSON.stringify(values)
                    })
                        .then(res => res.json())
                        .then(data => {
                            // getOffs()
                            toast.success(" کمپین با موفقیت اضافه شد")
                            setTimeout(() => {
                                resetForm()
                                setSubmitting(false)
                            }, 2000);
                        })

                }} >
                {({ isSubmitting }) => (
                    <div className='mt-5 text-sm md:text-lg'>
                        <span href="#" className="mb-6  text-gray-900 dark:text-white">
                            ساخت کمپین جدید
                        </span>
                        <Form className="space-y-1 md:space-y-1 grid gap-2 mb-6 md:grid-cols-2 mt-5">
                            <Input label="درصد تخفیف کمپین" type="text" name="discount" placeholder="20" />
                            <div className=''>
                                <label className="input-label">ثبت</label>
                                <button type="submit"
                                    className={isSubmitting ? ("input-submit bg-blue-500") : ("input-submit bg-blue-600")}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? ("لطفا صبر کنید ...") : ("اضافه کردن")}
                                </button>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik >
            <Toast />
        </>
    )
}
