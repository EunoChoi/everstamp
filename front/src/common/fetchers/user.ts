import Api from "@/common/api/Api";

export async function getCurrentUser() {
  try {
    const { data } = await Api.get(`/user/current`, {});
    //요청 실패시 data는 undefined, res.data가 아니라 res.response.data로 들어오기 때문
    return data;
  } catch (e: any) {
    console.error(e.response.data);
    throw new Error('Failed to get user(current) data!!');
  }
}