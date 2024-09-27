const tasks = [];

const gantt = new Gantt("#gantt", [], {
    language: 'de',
    readonly: 'true',
    date_format: 'DD.MM.YYYY',
    bar_height: 5,
    column_width: 10
});

grist.ready();
grist.onRecord(function (record) {
    gantt.set_scroll_position(record.Starttermin);
});

grist.onRecords(function (records) {
    // Konvertiere die JSON-Daten in das für Frappe Gantt passende Format
    const tasks = records.map(item => ({
        id: item.id,
        name: item.Anfragenummer,
        start: item.Starttermin,
        end: item.Endtermin,
        progress: 0,
        dependencies: "" // Du kannst Abhängigkeiten hier hinzufügen, falls notwendig
    }));

    gantt.refresh(tasks);
});