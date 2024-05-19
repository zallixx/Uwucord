import currentProfile from '@/lib/current-profile';
import { redirectToSignIn } from '@clerk/nextjs';
import { db } from '@/lib/db';
import DmFriendsItem from '@/components/dm/dm-friends-item';
import { Profile } from '@prisma/client';

interface DmFriendsAreaProps {
    activeBtn?: string;
}

interface FindConvProps {
    profile: Profile;
    anotherProfile: Profile;
}

async function findConversationByUserId(params: FindConvProps) {
    return db.conversation.findFirst({
        where: {
            OR: [
                {
                    profileOneId: params.profile?.id,
                    profileTwoId: params.anotherProfile?.id,
                },
                {
                    profileOneId: params.anotherProfile?.id,
                    profileTwoId: params.profile?.id,
                },
            ],
        },
    });
}


async function DmFriendsArea({activeBtn}: DmFriendsAreaProps) {
    const profile = await currentProfile();
    let anotherProfile: Profile;
    if (!profile) {
        return redirectToSignIn();
    }
    const friends = await db.friendship.findMany({
        where: {
            OR: [
                {
                    profileOneId: profile.id
                },
                {
                    profileTwoId: profile.id
                }
            ]
        },
        include: {
            profileOne: true,
            profileTwo: true
        }
    });

    const friendRequests = await db.friendshipRequest.findMany({
        where: {
            OR: [
                {
                    profileOneId: profile.id
                },
                {
                    profileTwoId: profile.id
                }
            ]
        },
        include: {
            profileOne: true,
            profileTwo: true
        }
    });


    return (
        <div className="flex flex-col h-full mt-3">
            {activeBtn === 'main' && (
                <div className="flex flex-col h-full mx-6">
                    {friends.map(async (friend) => {
                        if (friend?.profileOne.id === profile.id) {
                            anotherProfile = friend!.profileTwo;
                        } else if (friend?.profileTwo.id === profile.id) {
                            anotherProfile = friend!.profileOne;
                        }
                        const conversation = await findConversationByUserId({anotherProfile, profile});
                        if (conversation) {
                            return (
                                <DmFriendsItem key={anotherProfile.id} anotherProfile={anotherProfile} conversation={conversation}/>
                            );
                        }
                    })}
                </div>
            )}
        </div>
    );
}

export default DmFriendsArea;