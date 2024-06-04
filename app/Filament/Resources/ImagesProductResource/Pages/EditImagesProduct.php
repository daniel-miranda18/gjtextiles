<?php

namespace App\Filament\Resources\ImagesProductResource\Pages;

use App\Filament\Resources\ImagesProductResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditImagesProduct extends EditRecord
{
    protected static string $resource = ImagesProductResource::class;
    protected static ?string $title = 'Editar Imagen';

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make()->modalHeading('Eliminar Imagen'),
        ];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    protected function getSavedNotificationTitle(): ?string
    {
        return 'Imagen editada exitosamente.';
    }
}
