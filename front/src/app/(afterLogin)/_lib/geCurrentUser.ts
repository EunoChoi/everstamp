export async function getCurrentUser({ queryKey }: { queryKey: [string, string] }) {

  if (queryKey[1] === '') return null;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_BACK_SERVER_PORT}/user/current?email=${queryKey[1]}`, {
    next: {
      tags: ['user'],
    },
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) {
    console.log('Failed to fetch data!!');
    throw new Error('Failed to fetch data')
  }

  return res.json()
}