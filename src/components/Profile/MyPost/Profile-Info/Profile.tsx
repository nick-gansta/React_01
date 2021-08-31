import React, { useState } from 'react';
import s from './ProfileInfo.module.css';
import { ProfileUsersType } from '../../../../Redux/React_Redux_StoreType/types/StateType';
import Loader from '../../../Common/Loader/Loader';
import Photos
    from '../../../../img/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png';
import { ProfileStatuses } from './ProfileStatuses';
import ProfileData from './ProfileData/ProfileData';
import ProfileDataReduxForm  from './ProfileData/ProfileDataForm';


export type ProfileType = {
    profileUsers: ProfileUsersType
    status: string
    updateStatusThunk: (status: string) => void
    updatePhoto: (photo: string) => void
    owner: number
    updProfileData: (data: ProfileUsersType) => void
}
export const Profile: React.FC<ProfileType> = (props) => {
    const [editMode,setEditMode] = useState(false)
    if (!props.profileUsers) {
        return <Loader/>
    }
    const uploadPhoto = (e: any) => {
        if (e.target.files.length) {
            props.updatePhoto(e.target.files[0])
        }
    }

    const onSubmit = (value:ProfileUsersType) => {
        console.log(value)
        setEditMode(false)
        props.updProfileData(value)

    }
    const openEditMenu = () => setEditMode(true)
    return (
        <div className={s.container}>
            <div>
                <img className={s.img_avatar}
                     src={props.profileUsers.photos?.small !== null ? props.profileUsers.photos?.small : Photos}/>
                <div>
                    {!props.owner && <input type={'file'} onChange={uploadPhoto}/>}
                </div>
            </div>
            <div className={s.info}>
                <ProfileStatuses updateStatusThunk={props.updateStatusThunk} status={props.status}/>
                <div>
                    {editMode ?
                        //@ts-ignore
                        <ProfileDataReduxForm profileUsers={props.profileUsers} /*initialValues={props.profileUsers.fullName}*/ onSubmit={onSubmit}/>
                        :
                        <ProfileData openEditMenu={openEditMenu} profileUsers={props.profileUsers} />}
                </div>
            </div>
        </div>
    )
}
