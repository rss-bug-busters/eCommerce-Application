function spa(l: Location) {
  if (l.search[1] === '/') {
    const decoded = l.search
      .slice(1)
      .split('&')
      .map((s): string => s.replaceAll('~and~', '&'))
      .join('?');

    window.history.replaceState(
      undefined,
      '',
      l.pathname.slice(0, -1) + decoded + l.hash
    );
  }
}

export default spa;