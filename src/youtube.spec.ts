import { createChannel, createUser, updateChannelInfo, updateUser } from "./resolver";

describe("Youtube", () => {
  let userId: number;
  test("createUser", async () => {
    const data = {
      username: "TestUser" + new Date().getTime(),
      email: "TestEmail" + new Date().getTime() + "@email.com",
      accountName: "TestName" + new Date().getTime(),
    };
    const result = await createUser(data);
    userId = result.id;
    console.log("createUser", result);
    expect(result.username).toBe(data.username);
    expect(result.email).toBe(data.email);
    expect(result.accountName).toBe(data.accountName);
  });

  test("updateUser", async () => {
    const data = {
      userId,
      accountName: "TestUpdate" + new Date().getTime(),
      profilePicture: "https://img.img/TestProfile.jpg",
    };
    const result = await updateUser(data);
    console.log("updateUser", result);
    expect(result.accountName).toBe(data.accountName);
    expect(result.profilePicture).toBe(data.profilePicture);
  });
  let channelId: number
  test("createChannel", async () => {
    const data = {
      userId,
      name: "Channel" + new Date().getTime(),
      profilePicture: "https://img.img/TestChannelProfile.jpg"
    }
    const result = await createChannel(data)
    channelId = result.id
    console.log('createChannel', result)
    expect(result.name).toBe(data.name)
  })

  test("updateChannelInfo", async ()=>{
    const data = {
      channelId,
      name: "UpdatedChannelName" + new Date().getTime(),
      about: "UpdatedChannelAbout"
    } 
    const result = await updateChannelInfo(data)
    console.log('updateChannelInfo', result)
    expect(result.name).toBe(data.name)
    expect(result.id).toBe(data.channelId)
    expect(result.about).toBe(data.about)
  })
});
