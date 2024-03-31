import React from 'react';
import Link from 'next/link';

const forget = () => {
    return (
        <div class=" pt-20 bg-gray-100 flex flex-col justify-center py-6 sm:px-6 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Forget password
                </h2>
                <div class="mt-2 mx-3 text-center text-sm text-gray-600 max-w">
                    Or
                    <Link href={'/signup'} class="font-medium text-blue-600 hover:text-blue-500">
                        sign up
                    </Link>
                </div>

            </div>

            <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form class="space-y-6" action="#" method="POST">

                        <div class="mt-1">
                            <input id="email" name="email" type="email" autocomplete="email" required
                                class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your email address" />
                        </div>


                        <div>
                            <button type="submit"
                                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">

                                Continue
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>

    );
}

export default forget;
