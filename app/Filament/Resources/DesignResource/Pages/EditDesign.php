<?php

namespace App\Filament\Resources\DesignResource\Pages;

use App\Filament\Resources\DesignResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditDesign extends EditRecord
{
    protected static string $resource = DesignResource::class;

    protected static ?string $title = 'Editar Diseño';

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make()->modalHeading('Eliminar Diseño'),
        ];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    protected function getSavedNotificationTitle(): ?string
    {
        return 'Diseño editado exitosamente.';
    }
}
