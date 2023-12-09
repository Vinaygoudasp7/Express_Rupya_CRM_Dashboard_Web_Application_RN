import React from 'react'

const AdminLogin = () => {
    return (
        <div className='row'>
            <div className='col mt-5'>
                <div className='container d-flex justify-content-center mt-5'>
                    <div className='form w-50'>
                        <div className='text-center text-info'>
                            <h3>Sign In</h3>
                        </div>
                        <div className='form-body w-100'>
                            <form>
                                <div class="form-floating mb-3">
                                    <input type="email" class="form-control" id="email" placeholder="Your Name" />
                                    <label for="email">Email address</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="password" class="form-control" id="password" placeholder="Your Name" />
                                    <label for="password">Password</label>
                                </div>
                                <button className='btn btn-primary'>Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin
