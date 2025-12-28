// src/lib/portfolio/getDiplomas.ts

export type PublicDiploma = {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
};

export async function getDiplomas(): Promise<PublicDiploma[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/diplomas`, {
      cache: 'no-store',
    });

    const data = (await res.json()) as {
      ok: boolean;
      items?: PublicDiploma[];
    };

    if (!res.ok || !data.ok || !data.items) {
      return [];
    }

    return data.items;
  } catch {
    return [];
  }
}
