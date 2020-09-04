import { Marker } from './Marker';

export class MarkersRenderer {
	private activeMarkers = new Map<string, Marker>();

	render(markers: Marker[]): void {
		this.destroyOldMarkers(markers);
		this.showNewMarkers(markers);
	}

	private destroyOldMarkers(markers: Marker[]) {
		this.getMarkersToDisable(markers).forEach((marker) => {
			marker.destroy();
			this.activeMarkers.delete(marker.hash());
		});
	}

	private getMarkersToDisable(markers: Marker[]): Marker[] {
		const newMarkersMap = this.getMap(markers);
		return Array.from(this.activeMarkers.values()).filter(
			(marker) => !newMarkersMap.has(marker.hash()),
		);
	}

	private getMap(markers: Marker[]): Map<string, Marker> {
		return new Map(markers.map((marker) => [marker.hash(), marker]));
	}

	private showNewMarkers(markers: Marker[]) {
		this.getMarkersToShow(markers).forEach((marker) => {
			marker.show();
			this.activeMarkers.set(marker.hash(), marker);
		});
	}

	private getMarkersToShow(markers: Marker[]): Marker[] {
		return markers.filter((marker) => !this.activeMarkers.has(marker.hash()));
	}
}
